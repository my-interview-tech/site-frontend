#!/usr/bin/env bash
# Ежедневный снимок тома Verdaccio и удаление снимков старше 14 дней.
# Зачем: ручной backup не повторяется. Object Lock может не дать удалить свежие объекты, снимок при этом уже записан.
# Окружение берёт systemd из /root/.config/restic/verdaccio.env
set -euo pipefail

: "${RESTIC_REPOSITORY:?}"
: "${RESTIC_PASSWORD_FILE:?}"
: "${VERDACCIO_STORAGE:?}"

opts=(-o s3.region=ru-1)

restic "${opts[@]}" backup "$VERDACCIO_STORAGE" --tag verdaccio --host "${RESTIC_HOST:-verdaccio}"

if ! restic "${opts[@]}" forget --tag verdaccio --keep-daily 14 --prune; then
  echo "forget не удалил часть объектов: Object Lock держит их до конца срока. Снимок уже записан." >&2
fi
