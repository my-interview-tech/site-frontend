#!/usr/bin/env bash
set -euo pipefail

: "${RESTIC_REPOSITORY:?}"
: "${RESTIC_PASSWORD_FILE:?}"
: "${VERDACCIO_STORAGE:?}"

restic backup "$VERDACCIO_STORAGE" --tag verdaccio --host "${RESTIC_HOST:-verdaccio}"
