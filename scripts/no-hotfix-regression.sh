#!/usr/bin/env bash
# CI для PR в master: новая версия каждого @my-interview пакета в сайте должна содержать предыдущую.
# Проверка — тег прежней версии является предком тега новой.
# Зачем: релиз из release не должен откатить хотфикс, выпущенный из master.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ "${GITHUB_BASE_REF:-}" != "master" ]; then
  echo "Проверка только для PR в master"
  exit 0
fi

git fetch origin master --tags

node <<'NODE'
const { execFileSync } = require("child_process")
const fs = require("fs")

const read = (ref) => {
  try {
    const json = ref
      ? execFileSync("git", ["show", `${ref}:apps/site/package.json`], {
          encoding: "utf8",
          stdio: ["ignore", "pipe", "ignore"],
        })
      : fs.readFileSync("apps/site/package.json", "utf8")
    return JSON.parse(json)
  } catch {
    return null
  }
}

const names = (pkg) =>
  Object.keys({
    ...pkg.dependencies,
    ...pkg.devDependencies,
    ...pkg.peerDependencies,
  }).filter((name) => name.startsWith("@my-interview/"))

const versionOf = (pkg, name) =>
  pkg.dependencies?.[name] || pkg.devDependencies?.[name] || pkg.peerDependencies?.[name]

const exact = (version) => /^\d+\.\d+\.\d+$/.test(version || "")
const tagOf = (name, version) => `${name}@${version}`
const exists = (tag) => {
  try {
    execFileSync("git", ["rev-parse", "--verify", `refs/tags/${tag}`], { stdio: "ignore" })
    return true
  } catch {
    return false
  }
}

const current = read("")
const master = read("origin/master")
if (!current || !master) process.exit(0)

for (const name of names(current)) {
  const next = versionOf(current, name)
  const previous = versionOf(master, name)
  if (!exact(next) || !exact(previous) || next === previous) continue
  const nextTag = tagOf(name, next)
  const previousTag = tagOf(name, previous)
  if (!exists(nextTag) || !exists(previousTag)) {
    console.error(`Нет тега ${nextTag} или ${previousTag}`)
    process.exit(1)
  }
  try {
    execFileSync("git", ["merge-base", "--is-ancestor", previousTag, nextTag], { stdio: "ignore" })
  } catch {
    console.error(`${nextTag} не содержит ${previousTag}`)
    process.exit(1)
  }
}
NODE
