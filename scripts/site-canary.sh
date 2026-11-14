#!/usr/bin/env bash
# CI для PR: собирает сайт против текущих исходников пакетов.
# `*` вместо точных версий заставляет yarn взять workspace, а не закреплённые версии из реестра.
# Зачем: несовместимость пакета с сайтом видна до публикации и bump-site.
# Меняет apps/site/package.json — локально после запуска откатить файл.
set -euo pipefail

cd "$(dirname "$0")/.."

node <<'NODE'
const fs = require("fs")
const file = "apps/site/package.json"
const pkg = JSON.parse(fs.readFileSync(file, "utf8"))

for (const section of ["dependencies", "devDependencies", "peerDependencies"]) {
  const deps = pkg[section]
  if (!deps) continue
  for (const name of Object.keys(deps)) {
    if (name.startsWith("@my-interview/")) deps[name] = "*"
  }
}

fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`)
NODE

yarn install --ignore-scripts
yarn workspace @my-interview/site build:test
