#!/usr/bin/env bash
# Проверки репозитория: lint, typecheck, test и build затронутых пакетов, changeset, сборка стенда сайта.
# Один и тот же сценарий для pre-push и CI.
# VERIFY_SCOPE: all | checks | stand
# VERIFY_FULL=1 — turbo без --affected (push в release и master)
# STAND_ENV: test | production, когда VERIFY_SCOPE=stand
# TURBO_SCM_BASE — база affected, по умолчанию origin/release
set -euo pipefail

cd "$(dirname "$0")/.."
exec < /dev/null

scope="${VERIFY_SCOPE:-all}"
full="${VERIFY_FULL:-0}"
base="${TURBO_SCM_BASE:-origin/release}"
export TURBO_SCM_BASE="$base"

VITE_KEYS=(
  VITE_SITE_URL
  VITE_MAIN_APP_URL
  VITE_API_URL
  VITE_API_MOCK
  VITE_COOKIE_DOMAIN
  VITE_YM_COUNTER_ID
)

check_node() {
  local expected actual
  expected="$(tr -d '[:space:]' < .nvmrc)"
  actual="$(node -v | sed 's/^v//')"
  case "$actual" in
    "$expected" | "$expected".*) ;;
    *)
      echo "Node $actual, в .nvmrc указана $expected" >&2
      exit 1
      ;;
  esac
}

require_base() {
  if ! git rev-parse --verify "$base" >/dev/null 2>&1; then
    echo "Нет $base. Выполни git fetch origin release" >&2
    exit 1
  fi
}

run_turbo() {
  if [ "$full" = "1" ]; then
    yarn turbo run lint lint:styled typecheck test build
    return
  fi
  require_base
  yarn turbo run lint lint:styled typecheck test build --affected
}

check_changeset() {
  [ "$full" = "1" ] || require_base
  local changed
  changed="$(git diff --name-only "$base"...HEAD -- packages || true)"
  if ! printf '%s\n' "$changed" | grep -q '/src/'; then
    return
  fi
  if [ ! -f .changeset/config.json ]; then
    echo "Изменён packages/*/src, а .changeset/config.json нет" >&2
    exit 1
  fi
  yarn changeset status --since="$base"
}

site_affected() {
  [ "$full" = "1" ] && return 0
  require_base
  local json answer
  json="$(./node_modules/.bin/turbo run build --filter=@my-interview/site --affected --dry-run=json)"
  answer="$(printf '%s' "$json" | node -e '
    let raw = ""
    process.stdin.on("data", (chunk) => { raw += chunk })
    process.stdin.on("end", () => {
      const start = raw.indexOf("{")
      if (start < 0) {
        process.stderr.write("turbo dry-run не вернул JSON\n")
        process.exit(1)
      }
      const data = JSON.parse(raw.slice(start))
      const hit = (data.tasks || []).some((task) => {
        const id = task.taskId || ""
        return id.startsWith("@my-interview/site#") && task.command && task.command !== "<NONEXISTENT>"
      })
      process.stdout.write(hit ? "yes" : "no")
    })
  ')"
  [ "$answer" = "yes" ]
}

apply_stand_env() {
  local env_name="$1"
  local prefix="TEST_"
  [ "$env_name" = "production" ] && prefix="PROD_"
  local key
  for key in "${VITE_KEYS[@]}"; do
    if printenv "${prefix}${key}" >/dev/null 2>&1; then
      export "${key}=$(printenv "${prefix}${key}")"
    fi
  done
}

build_stand() {
  local env_name="$1"
  echo "Сборка стенда: $env_name"
  (
    apply_stand_env "$env_name"
    if [ "$env_name" = "test" ]; then
      yarn workspace @my-interview/site build:test
    else
      yarn workspace @my-interview/site build
    fi
  )
}

check_node
yarn install --frozen-lockfile --check-files

if [ "$scope" = "all" ] || [ "$scope" = "checks" ]; then
  run_turbo
  check_changeset
fi

if [ "$scope" = "all" ] || [ "$scope" = "stand" ]; then
  if [ "$scope" = "stand" ] && [ "${STAND_ENV:-}" != "test" ] && [ "${STAND_ENV:-}" != "production" ]; then
    echo "STAND_ENV должен быть test или production" >&2
    exit 1
  fi
  if site_affected; then
    if [ "$scope" = "stand" ]; then
      build_stand "$STAND_ENV"
    else
      build_stand test
      build_stand production
    fi
  else
    echo "Сайт и его зависимости не затронуты, сборка стенда пропущена"
  fi
fi
