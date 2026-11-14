#!/usr/bin/env bash
# Кладёт tarball опубликованных пакетов в GitHub Release с тегом name@version.
# Зачем: резервная копия Verdaccio, из неё restore-registry.sh переопубликует реестр.
# release.yml: --json, на stdin publishedPackages из changesets. Руками: name@version ... [--dry-run]
set -euo pipefail

cd "$(dirname "$0")/.."

dry=0
json=0
if [ "${1:-}" = "--dry-run" ]; then
  dry=1
  shift
fi
if [ "${1:-}" = "--json" ]; then
  json=1
  shift
fi

specs=()
if [ "$json" = 1 ]; then
  raw="$(cat)"
  # shellcheck disable=SC2016
  while IFS= read -r spec; do
    [ -n "$spec" ] && specs+=("$spec")
  done < <(printf '%s' "$raw" | node -e '
    let raw = ""
    process.stdin.on("data", (chunk) => { raw += chunk })
    process.stdin.on("end", () => {
      const items = JSON.parse(raw)
      for (const item of items) process.stdout.write(`${item.name}@${item.version}\n`)
    })
  ')
else
  specs=("$@")
fi

if [ "${#specs[@]}" -eq 0 ]; then
  echo "Нет опубликованных пакетов" >&2
  exit 1
fi

if [ "$dry" = 0 ] && [ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]; then
  echo "Нужен GH_TOKEN" >&2
  exit 1
fi

# Каталог в packages/ по имени пакета из package.json
package_dir() {
  node -e '
    const fs = require("fs")
    const path = require("path")
    const name = process.argv[1]
    const root = "packages"
    for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue
      const file = path.join(root, entry.name, "package.json")
      if (!fs.existsSync(file)) continue
      const pkg = JSON.parse(fs.readFileSync(file, "utf8"))
      if (pkg.name === name) {
        process.stdout.write(path.join(root, entry.name))
        process.exit(0)
      }
    }
    process.exit(1)
  ' "$1"
}

for spec in "${specs[@]}"; do
  name="${spec%@*}"
  version="${spec##*@}"
  tag="${name}@${version}"
  dir="$(package_dir "$name")"
  if [ "$dry" = 1 ]; then
    echo "pack $dir -> $tag"
    continue
  fi
  dest="$(mktemp -d)"
  npm pack --pack-destination "$dest" "$dir" >/dev/null
  tarball="$(find "$dest" -name '*.tgz' -print -quit)"
  if gh release view "$tag" >/dev/null 2>&1; then
    gh release upload "$tag" "$tarball" --clobber
  else
    gh release create "$tag" "$tarball" --title "$tag" --notes "Tarball $tag"
  fi
done
