#!/usr/bin/env bash
# Восстановление Verdaccio после потери данных, запускается руками.
# Переопубликует tarball из GitHub Releases или RESTORE_TARBALL_DIR в порядке зависимостей, уже опубликованные версии пропускает.
# --from-restic сначала разворачивает последний снапшот restic в RESTORE_DIR. --dry-run печатает план.
set -euo pipefail

registry="${REGISTRY:-https://npm.my-interview.tech}"
repo="${GITHUB_REPOSITORY:-my-interview-tech/site-frontend}"
from_restic=0
dry=0
tarball_dir="${RESTORE_TARBALL_DIR:-}"

while [ "$#" -gt 0 ]; do
  case "$1" in
    --from-restic) from_restic=1 ;;
    --dry-run) dry=1 ;;
    *)
      echo "Неизвестный аргумент: $1" >&2
      exit 1
      ;;
  esac
  shift
done

workdir="$(mktemp -d)"
trap 'rm -rf "$workdir"' EXIT

if [ "$from_restic" = 1 ]; then
  : "${RESTIC_REPOSITORY:?}"
  : "${RESTIC_PASSWORD_FILE:?}"
  restore_dir="${RESTORE_DIR:-$PWD/verdaccio-restore}"
  mkdir -p "$restore_dir"
  restic restore latest --target "$restore_dir"
  echo "Снапшот restic: $restore_dir"
fi

mkdir -p "$workdir/tarballs"
if [ -n "$tarball_dir" ]; then
  find "$tarball_dir" -name '*.tgz' -exec cp {} "$workdir/tarballs/" \;
else
  if [ -z "${GH_TOKEN:-}${GITHUB_TOKEN:-}" ]; then
    echo "Нужен GH_TOKEN" >&2
    exit 1
  fi
  while IFS= read -r tag; do
    [ -n "$tag" ] || continue
    dest="$workdir/tarballs/$tag"
    mkdir -p "$dest"
    gh release download "$tag" --repo "$repo" --pattern '*.tgz' --dir "$dest" --clobber
  done < <(gh release list --repo "$repo" --limit 1000 --json tagName --jq '.[] | select(.tagName | startswith("@my-interview/")) | .tagName')
  find "$workdir/tarballs" -mindepth 2 -name '*.tgz' -exec mv {} "$workdir/tarballs/" \;
fi

# Пакет публикуется после внутренних зависимостей, версии которых подходят под его диапазон
ordered=()
while IFS= read -r line; do
  [ -n "$line" ] && ordered+=("$line")
done < <(node - "$workdir/tarballs" <<'NODE'
const fs = require("fs")
const path = require("path")
const { execFileSync } = require("child_process")
const dir = process.argv[2]
const files = fs.readdirSync(dir).filter((name) => name.endsWith(".tgz"))
const items = files.map((file) => {
  const json = execFileSync("tar", ["-xOf", path.join(dir, file), "package/package.json"], { encoding: "utf8" })
  const pkg = JSON.parse(json)
  const deps = { ...pkg.dependencies, ...pkg.peerDependencies }
  const internal = Object.entries(deps).filter(([name]) => name.startsWith("@my-interview/"))
  return { file: path.join(dir, file), name: pkg.name, version: pkg.version, deps: internal }
})

const cmp = (a, b) => {
  const pa = a.split(".").map(Number)
  const pb = b.split(".").map(Number)
  for (let i = 0; i < 3; i += 1) {
    const diff = (pa[i] || 0) - (pb[i] || 0)
    if (diff !== 0) return diff
  }
  return 0
}

const satisfies = (range, version) => {
  if (!range || range === "*" || range === "latest") return true
  const exact = range.match(/^(\d+\.\d+\.\d+)$/)
  if (exact) return exact[1] === version
  const caret = range.match(/^\^(\d+)\.(\d+)\.(\d+)$/)
  if (caret) {
    const [major, minor] = [Number(caret[1]), Number(caret[2])]
    const [vmajor, vminor] = version.split(".").map(Number)
    if (cmp(version, caret.slice(1).join(".")) < 0) return false
    if (major === 0) return vmajor === 0 && vminor === minor
    return vmajor === major
  }
  const tilde = range.match(/^~(\d+)\.(\d+)\.(\d+)$/)
  if (tilde) {
    if (cmp(version, tilde.slice(1).join(".")) < 0) return false
    const [major, minor] = version.split(".").map(Number)
    return major === Number(tilde[1]) && minor === Number(tilde[2])
  }
  return false
}

const published = []
const pending = [...items]
const order = []
while (pending.length > 0) {
  const wave = pending.filter((item) => item.deps.every(([name, range]) => {
    const same = items.filter((other) => other.name === name)
    if (same.length === 0) return true
    return published.some((done) => done.name === name && satisfies(range, done.version))
  }))
  if (wave.length === 0) {
    process.stderr.write(`Цикл зависимостей: ${pending.map((item) => item.name + "@" + item.version).join(", ")}\n`)
    process.exit(1)
  }
  wave.sort((a, b) => cmp(a.version, b.version) || a.name.localeCompare(b.name))
  for (const item of wave) {
    published.push(item)
    order.push(item.file)
    pending.splice(pending.indexOf(item), 1)
  }
}
process.stdout.write(order.join("\n"))
if (order.length > 0) process.stdout.write("\n")
NODE
)

if [ "${#ordered[@]}" -eq 0 ]; then
  echo "Tarball для восстановления нет"
  exit 0
fi

host="$(node -e 'process.stdout.write(new URL(process.argv[1]).host)' "$registry")"

for tarball in "${ordered[@]}"; do
  meta="$(tar -xOf "$tarball" package/package.json)"
  name="$(printf '%s' "$meta" | node -e 'let s="";process.stdin.on("data",c=>s+=c);process.stdin.on("end",()=>process.stdout.write(JSON.parse(s).name))')"
  version="$(printf '%s' "$meta" | node -e 'let s="";process.stdin.on("data",c=>s+=c);process.stdin.on("end",()=>process.stdout.write(JSON.parse(s).version))')"
  if [ "$dry" = 1 ]; then
    echo "publish $name@$version"
    continue
  fi
  if npm view "$name@$version" version --registry "$registry" >/dev/null 2>&1; then
    echo "Уже есть $name@$version"
    continue
  fi
  : "${NPM_TOKEN:?}"
  userconfig="$workdir/npmrc"
  printf '//%s/:_authToken=%s\n' "$host" "$NPM_TOKEN" >"$userconfig"
  npm publish "$tarball" --registry "$registry" --userconfig "$userconfig"
done
