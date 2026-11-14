#!/usr/bin/env bash
# Доводит мерж master → release в back-merge.yml после хотфикса.
# Зачем: конфликты версий и CHANGELOG типовые, их решаем автоматически, а хотфикс не теряется в release.
set -euo pipefail

cd "$(dirname "$0")/.."

cmp_version() {
  node -e '
    const [a, b] = process.argv.slice(1)
    const pa = a.split(".").map(Number)
    const pb = b.split(".").map(Number)
    let diff = 0
    for (let i = 0; i < 3; i += 1) diff = diff || (pa[i] || 0) - (pb[i] || 0)
    process.stdout.write(String(diff))
  ' "$1" "$2"
}

version_of() {
  node -e 'let s=""; process.stdin.on("data", (c) => { s += c }); process.stdin.on("end", () => process.stdout.write(JSON.parse(s).version))'
}

resolve_package_json() {
  local file="$1"
  local ours theirs version
  ours="$(git show ":2:$file" | version_of)"
  theirs="$(git show ":3:$file" | version_of)"
  version="$ours"
  if [ "$(cmp_version "$theirs" "$ours")" -gt 0 ]; then
    version="$theirs"
  fi
  git show ":2:$file" >"$file"
  # shellcheck disable=SC2016
  node -e '
    const fs = require("fs")
    const file = process.argv[1]
    const pkg = JSON.parse(fs.readFileSync(file, "utf8"))
    pkg.version = process.argv[2]
    fs.writeFileSync(file, `${JSON.stringify(pkg, null, 2)}\n`)
  ' "$file" "$version"
  git add "$file"
}

resolve_changelog() {
  local file="$1"
  git show ":2:$file" >"$file.ours"
  git show ":3:$file" >"$file.theirs"
  node - "$file" "$file.ours" "$file.theirs" <<'NODE'
const fs = require("fs")
const [out, oursPath, theirsPath] = process.argv.slice(2)
const sections = (text) => text.split(/\n(?=## )/)
const ours = sections(fs.readFileSync(oursPath, "utf8"))
const theirs = sections(fs.readFileSync(theirsPath, "utf8"))
const seen = new Set()
const merged = []
for (const section of [...ours, ...theirs]) {
  const title = (section.match(/^## .+/m) || [section.slice(0, 80)])[0]
  if (seen.has(title)) continue
  seen.add(title)
  merged.push(section.replace(/^\n/, ""))
}
fs.writeFileSync(out, merged.join("\n").replace(/\n{3,}/g, "\n\n"))
NODE
  rm -f "$file.ours" "$file.theirs"
  git add "$file"
}

# Конфликты мержа: version — старшая из двух, CHANGELOG — секции обеих веток, сайт — как в release.
# Остальное скрипт не решает и падает.
if git diff --name-only --diff-filter=U | grep -q .; then
  while IFS= read -r file; do
    case "$file" in
      packages/*/package.json) resolve_package_json "$file" ;;
      packages/*/CHANGELOG.md) resolve_changelog "$file" ;;
      apps/site/package.json | apps/site/yarn.lock) git checkout --ours -- "$file" && git add "$file" ;;
      *)
        echo "Конфликт $file скрипт не решает" >&2
        exit 1
        ;;
    esac
  done < <(git diff --name-only --diff-filter=U)
fi

# Сайт на точных версиях — пересобрать его yarn.lock под результат мержа
if node -e '
  const pkg = require("./apps/site/package.json")
  const deps = { ...pkg.dependencies, ...pkg.devDependencies }
  const internal = Object.entries(deps).filter(([name]) => name.startsWith("@my-interview/"))
  process.exit(internal.length > 0 && internal.every(([, version]) => /^\d+\.\d+\.\d+$/.test(version)) ? 0 : 1)
'; then
  scripts/lock-site.sh
  git add apps/site/yarn.lock apps/site/package.json
fi

# Пакеты, где release ушёл по версии вперёд master: patch-changeset выпустит их новую версию с хотфиксом
notes=()
while IFS= read -r file; do
  if ! git cat-file -e "origin/master:$file" 2>/dev/null; then
    continue
  fi
  release_version="$(git show "origin/release:$file" | version_of)"
  master_version="$(git show "origin/master:$file" | version_of)"
  if [ "$(cmp_version "$release_version" "$master_version")" -gt 0 ]; then
    name="$(node -e 'let s="";process.stdin.on("data",c=>s+=c);process.stdin.on("end",()=>process.stdout.write(JSON.parse(s).name))' <<<"$(git show "origin/release:$file")")"
    notes+=("$name")
  fi
done < <(git ls-tree -r --name-only origin/release packages | grep '/package.json$' || true)

if [ "${#notes[@]}" -eq 0 ]; then
  exit 0
fi

summary="$(git log -1 --format=%s origin/master)"
{
  echo "---"
  for name in "${notes[@]}"; do
    printf '"%s": patch\n' "$name"
  done
  echo "---"
  echo
  echo "backport: $summary"
} >".changeset/backport-$(date +%s).md"
git add .changeset
