#!/usr/bin/env bash
# Собирает и публикует пакеты в Verdaccio из release.yml.
# Из master (хотфикс) — с dist-tag hotfix, чтобы не сдвинуть latest, который ведёт release.
set -euo pipefail

cd "$(dirname "$0")/.."

export NPM_TOKEN="${NPM_TOKEN_PUBLISH:-${NPM_TOKEN:-}}"

yarn build:packages

case "${GITHUB_REF:-}" in
  refs/heads/master)
    yarn changeset publish --tag hotfix
    ;;
  *)
    yarn changeset publish
    ;;
esac
