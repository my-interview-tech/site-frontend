#!/usr/bin/env bash
# После публикации в release.yml ставит сайту точные версии опубликованных пакетов,
# пересобирает apps/site/yarn.lock и открывает PR из bump-site/<ветка>.
# Зачем: Docker собирает сайт только из реестра, версия пакета в проде меняется явным PR.
# PUBLISHED — publishedPackages из changesets/action.
set -euo pipefail

cd "$(dirname "$0")/.."

if [ -z "${PUBLISHED:-}" ] || [ "$PUBLISHED" = "[]" ]; then
  echo "Публикаций нет"
  exit 0
fi

node <<'NODE'
const fs = require("fs")
const published = JSON.parse(process.env.PUBLISHED)
const versions = new Map(published.map((item) => [item.name, item.version]))
const file = "apps/site/package.json"
const pkg = JSON.parse(fs.readFileSync(file, "utf8"))

for (const section of ["dependencies", "devDependencies", "peerDependencies"]) {
  const deps = pkg[section]
  if (!deps) continue
  for (const name of Object.keys(deps)) {
    if (versions.has(name)) deps[name] = versions.get(name)
  }
}

fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`)
NODE

scripts/lock-site.sh

# status, а не diff: первый yarn.lock ещё не в индексе, diff его не видит
if [ -z "$(git status --porcelain -- apps/site/package.json apps/site/yarn.lock)" ]; then
  echo "Версии сайта не изменились"
  exit 0
fi

branch="bump-site/${GITHUB_REF_NAME:-local}"
git config user.name "github-actions[bot]"
git config user.email "41898282+github-actions[bot]@users.noreply.github.com"
git checkout -B "$branch"
git add apps/site/package.json apps/site/yarn.lock
git commit -m "chore: поднять версии @my-interview в сайте"
git push --force-with-lease origin "$branch"

base="${GITHUB_REF_NAME:-release}"
if gh pr list --head "$branch" --base "$base" --state open --json number --jq 'length' | grep -qx 0; then
  gh pr create \
    --base "$base" \
    --head "$branch" \
    --title "Bump @my-interview packages" \
    --body "Точные версии пакетов, опубликованных в $base."
fi
