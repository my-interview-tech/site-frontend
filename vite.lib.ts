import { globSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'url'

import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import dts from 'vite-plugin-dts'

const repoRoot = path.dirname(fileURLToPath(import.meta.url))

const ALWAYS_EXTERNAL = ['react', 'react-dom', 'react-router', 'styled-components']

const isExternal = (id: string, names: string[]): boolean =>
  names.some((name) => id === name || id.startsWith(`${name}/`))

export default defineConfig(() => {
  const pkg = JSON.parse(readFileSync(path.resolve(process.cwd(), 'package.json'), 'utf8')) as {
    dependencies?: Record<string, string>
    peerDependencies?: Record<string, string>
  }
  const externalNames = [
    ...ALWAYS_EXTERNAL,
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.peerDependencies ?? {}),
  ]
  const workers = globSync('src/**/*.worker.ts', { cwd: process.cwd() })

  return {
    root: process.cwd(),
    publicDir: false,
    plugins: [
      react(),
      dts({
        tsconfigPath: './tsconfig.json',
        entryRoot: 'src',
        include: ['src'],
        exclude: ['src/**/*.test.ts', 'src/**/*.test.tsx', 'src/**/*.story.ts', 'src/**/*.story.tsx'],
        pathsToAliases: true,
      }) as Plugin,
    ],
    resolve: {
      tsconfigPaths: true,
      alias: [
        {
          find: '@acemir/cssom',
          replacement: path.resolve(repoRoot, 'node_modules/@acemir/cssom/lib/index.js'),
        },
      ],
    },
    experimental: {
      renderBuiltUrl(filename, { hostType }) {
        if (hostType === 'js') {
          return { relative: true }
        }

        return filename
      },
    },
    build: {
      outDir: 'dist',
      emptyOutDir: true,
      copyPublicDir: false,
      minify: false,
      lib: {
        entry: ['src/index.ts', ...workers],
        formats: ['es'],
        fileName: (_format, entryName) => `${entryName}.js`,
      },
      rolldownOptions: {
        external: (id) => isExternal(id, externalNames),
        output: {
          preserveModules: true,
          preserveModulesRoot: 'src',
        },
      },
    },
  }
})
