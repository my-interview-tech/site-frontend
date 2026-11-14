#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"
file="${1:-htpasswd}"
publisher="$(openssl rand -base64 24)"
reader="$(openssl rand -base64 24)"

if command -v htpasswd >/dev/null 2>&1; then
  htpasswd -bcB "$file" ci-publisher "$publisher" >/dev/null
  htpasswd -bB "$file" ci-reader "$reader" >/dev/null
else
  docker run --rm httpd:alpine htpasswd -nbB ci-publisher "$publisher" >"$file"
  docker run --rm httpd:alpine htpasswd -nbB ci-reader "$reader" >>"$file"
fi
chmod 644 "$file"

printf 'ci-publisher %s\n' "$publisher"
printf 'ci-reader %s\n' "$reader"
printf 'Файл %s не коммитить. Токен: npm login --registry https://npm.my-interview.tech, затем npm token create.\n' "$file"
