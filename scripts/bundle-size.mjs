#!/usr/bin/env node
// Размер сборки сайта: первый экран, догрузка маршрутов, воркеры, итог.
// Зачем: сравнить бандл до и после правки в raw, gzip и brotli.
// Сборка с манифестом: yarn workspace @my-interview/site build --manifest
// node scripts/bundle-size.mjs [--json out.json] [--compare base.json]

import { existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { brotliCompressSync, constants, gzipSync } from 'node:zlib'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const buildDir = path.join(rootDir, 'apps/site/build')
const manifestPath = path.join(buildDir, '.vite/manifest.json')

const args = process.argv.slice(2)
const getArg = (name) => {
  const index = args.indexOf(name)
  return index === -1 ? null : args[index + 1]
}

const sizeCache = new Map()

const measureFile = (file) => {
  if (sizeCache.has(file)) return sizeCache.get(file)
  const buffer = readFileSync(path.join(buildDir, file))
  const size = {
    raw: buffer.length,
    gzip: gzipSync(buffer, { level: 9 }).length,
    brotli: brotliCompressSync(buffer, { params: { [constants.BROTLI_PARAM_QUALITY]: 11 } }).length,
  }
  sizeCache.set(file, size)
  return size
}

const sumFiles = (files) =>
  [...files].reduce(
    (acc, file) => {
      const size = measureFile(file)
      return {
        raw: acc.raw + size.raw,
        gzip: acc.gzip + size.gzip,
        brotli: acc.brotli + size.brotli,
        files: acc.files + 1,
      }
    },
    { raw: 0, gzip: 0, brotli: 0, files: 0 }
  )

const isWorker = (file) => /worker/i.test(path.basename(file))
const isCode = (file) => /\.(js|css)$/.test(file)

const html = readFileSync(path.join(buildDir, 'index.html'), 'utf8')
const initial = new Set([...html.matchAll(/["'](\/assets\/[^"']+\.(?:js|css))["']/g)].map((match) => match[1].slice(1)))

const assets = readdirSync(path.join(buildDir, 'assets'))
  .map((file) => `assets/${file}`)
  .filter(isCode)

const manifest = existsSync(manifestPath) ? JSON.parse(readFileSync(manifestPath, 'utf8')) : null

const collectStatic = (key, files = new Set(), seen = new Set()) => {
  if (seen.has(key)) return files
  seen.add(key)
  const chunk = manifest[key]
  files.add(chunk.file)
  chunk.css?.forEach((file) => files.add(file))
  chunk.imports?.forEach((child) => collectStatic(child, files, seen))
  return files
}

const routes = {}
if (manifest) {
  Object.keys(manifest)
    .filter((key) => /src\/pages\/.+\.tsx$/.test(key) && manifest[key].isDynamicEntry)
    .sort()
    .forEach((key) => {
      const extra = [...collectStatic(key)].filter((file) => !initial.has(file) && isCode(file))
      routes[key.replace(/^.*src\/pages\//, '')] = sumFiles(extra)
    })
}

const result = {
  initial: sumFiles(initial),
  routes,
  workers: sumFiles(assets.filter(isWorker)),
  total: sumFiles(assets),
}

const kb = (bytes) => `${(bytes / 1024).toFixed(1)}`
const signed = (bytes) => `${bytes > 0 ? '+' : ''}${kb(bytes)}`
const percent = (next, prev) => (prev ? `${(((next - prev) / prev) * 100).toFixed(1)}%` : '—')

const base = getArg('--compare') ? JSON.parse(readFileSync(getArg('--compare'), 'utf8')) : null

const rows = [
  ['Первый экран', result.initial, base?.initial],
  ...Object.entries(result.routes).map(([name, size]) => [`  маршрут ${name}`, size, base?.routes?.[name]]),
  ['Воркеры', result.workers, base?.workers],
  ['Всего', result.total, base?.total],
]

const header = ['', 'files', 'raw KB', 'gzip KB', 'brotli KB', ...(base ? ['Δ gzip KB', 'Δ gzip', 'Δ brotli KB'] : [])]
const table = rows.map(([name, size, prev]) => [
  name,
  String(size.files),
  kb(size.raw),
  kb(size.gzip),
  kb(size.brotli),
  ...(base
    ? [signed(size.gzip - (prev?.gzip ?? 0)), percent(size.gzip, prev?.gzip), signed(size.brotli - (prev?.brotli ?? 0))]
    : []),
])

const widths = header.map((_, column) => Math.max(...[header, ...table].map((row) => row[column].length)))
const format = (row) =>
  row.map((cell, column) => (column === 0 ? cell.padEnd(widths[column]) : cell.padStart(widths[column]))).join('  ')

if (!manifest) console.warn('Нет .vite/manifest.json: маршруты не посчитаны, собери с --manifest\n')
console.log(format(header))
table.forEach((row) => console.log(format(row)))

const jsonPath = getArg('--json')
if (jsonPath) writeFileSync(jsonPath, `${JSON.stringify(result, null, 2)}\n`)
