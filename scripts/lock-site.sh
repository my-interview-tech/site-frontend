#!/usr/bin/env bash
# Собирает apps/site/yarn.lock отдельно от монорепо: во временной папке ставит только зависимости сайта из реестра.
# Зачем: этот lock использует Docker-сборка сайта, корневой yarn.lock ссылается на workspace.
# Нужен NPM_TOKEN с доступом к Verdaccio.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

cp "$root/apps/site/package.json" "$tmp/package.json"
cp "$root/apps/site/.npmrc" "$tmp/.npmrc"

(
  cd "$tmp"
  yarn install --ignore-scripts
)

cp "$tmp/yarn.lock" "$root/apps/site/yarn.lock"
