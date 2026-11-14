#!/usr/bin/env bash
# Выкладка сайта на закрытый test-стенд из deploy-site.yml. Prod на www не трогает.
# build — собрать и запушить образ из BUILD_CONTEXT, tag и ready пишутся в GITHUB_OUTPUT.
# deploy — выложить IMAGE_SHA на test. Скрипт и infra/test-stand берутся из текущего checkout.
set -euo pipefail

cd "$(dirname "$0")/.."

mode="${1:-}"
environment="${DEPLOY_ENVIRONMENT:-test}"
host_name="test.my-interview.tech"
remote_dir="/opt/my-interview/test-stand"

output() {
  if [ -n "${GITHUB_OUTPUT:-}" ]; then
    printf '%s=%s\n' "$1" "$2" >>"$GITHUB_OUTPUT"
  fi
}

# Прод выложен вне этого скрипта, подменять его нельзя
if [ "$environment" = "production" ]; then
  if [ "${DEPLOY_PRODUCTION:-}" != "true" ]; then
    echo "Прод уже выложен отдельно. Новая выкладка не запускается, пока DEPLOY_PRODUCTION не true."
    output ready 0
    exit 0
  fi
  echo "Выкладка production этим скриптом не подменяет текущий www." >&2
  exit 1
fi

if [ "$environment" != "test" ]; then
  echo "Окружение должно быть test" >&2
  exit 1
fi

build_image() {
  local context="${BUILD_CONTEXT:-.}"
  local sha image

  # Откат или повтор: образ уже лежит в ghcr, собирать не нужно
  if [ -n "${IMAGE_SHA:-}" ]; then
    echo "Откат на собранный образ ${IMAGE_SHA}-test"
    output tag "$IMAGE_SHA"
    output ready 1
    return
  fi

  sha="$(git -C "$context" rev-parse HEAD)"
  output tag "$sha"

  # Без lock-файла сайта Docker-сборка невоспроизводима: пропускаем, не падаем
  if [ ! -f "$context/apps/site/yarn.lock" ]; then
    echo "apps/site/yarn.lock нет. Сначала опубликовать пакеты и выполнить scripts/lock-site.sh"
    output ready 0
    return
  fi

  image="ghcr.io/my-interview-tech/site:${sha}-test"
  echo "$GITHUB_TOKEN" | docker login ghcr.io -u "${GITHUB_ACTOR}" --password-stdin
  DOCKER_BUILDKIT=1 docker build -f "$context/apps/site/Dockerfile" \
    --secret id=npm_token,env=NPM_TOKEN \
    --build-arg APP_ENV=test \
    --build-arg VITE_SITE_URL="${TEST_VITE_SITE_URL:-}" \
    --build-arg VITE_MAIN_APP_URL="${TEST_VITE_MAIN_APP_URL:-}" \
    --build-arg VITE_API_URL="${TEST_VITE_API_URL:-}" \
    --build-arg VITE_API_MOCK="${TEST_VITE_API_MOCK:-}" \
    --build-arg VITE_COOKIE_DOMAIN="${TEST_VITE_COOKIE_DOMAIN:-}" \
    --build-arg VITE_YM_COUNTER_ID="${TEST_VITE_YM_COUNTER_ID:-}" \
    -t "$image" \
    "$context"
  docker push "$image"
  output ready 1
}

deploy_image() {
  local sha="${IMAGE_SHA:-}"
  local required work target q_dir
  local -a ssh_opts

  if [ -z "$sha" ]; then
    echo "Нет IMAGE_SHA" >&2
    exit 1
  fi

  if [ -z "${SSH_HOST:-}" ] || [ -z "${SSH_KEY:-}" ]; then
    echo "SSH_HOST или SSH_KEY не заданы. Образ не выкладывается."
    exit 0
  fi

  for required in SSH_KNOWN_HOSTS TEST_STAND_ACCESS_TOKEN OAUTH2_PROXY_CLIENT_ID OAUTH2_PROXY_CLIENT_SECRET OAUTH2_PROXY_COOKIE_SECRET GHCR_READ_TOKEN GHCR_USER; do
    if [ -z "${!required:-}" ]; then
      echo "Нет ${required}" >&2
      exit 1
    fi
  done

  if ! [[ "$TEST_STAND_ACCESS_TOKEN" =~ ^[A-Za-z0-9_-]{32,}$ ]]; then
    echo "TEST_STAND_ACCESS_TOKEN: только [A-Za-z0-9_-], не короче 32 символов" >&2
    exit 1
  fi

  # Секреты идут через файлы с правами 600 и stdin ssh, не через argv
  # trap на EXIT функции срабатывает после её выхода: work должна пережить return
  local work
  work="$(mktemp -d)"
  trap 'rm -rf "$work"' RETURN
  umask 077
  printf '%s\n' "$SSH_KEY" >"$work/key"
  printf '%s\n' "$SSH_KNOWN_HOSTS" >"$work/known_hosts"
  printf 'X-Test-Access: %s\n' "$TEST_STAND_ACCESS_TOKEN" >"$work/header"
  cat >"$work/env" <<EOF
OAUTH2_PROXY_CLIENT_ID=${OAUTH2_PROXY_CLIENT_ID}
OAUTH2_PROXY_CLIENT_SECRET=${OAUTH2_PROXY_CLIENT_SECRET}
OAUTH2_PROXY_COOKIE_SECRET=${OAUTH2_PROXY_COOKIE_SECRET}
SITE_TAG=${sha}
EOF
  printf '@needs_login not header X-Test-Access "%s"\n' "$TEST_STAND_ACCESS_TOKEN" >"$work/token"

  ssh_opts=(-i "$work/key" -o "UserKnownHostsFile=$work/known_hosts" -o StrictHostKeyChecking=yes)
  target="${SSH_USER:-root}@${SSH_HOST}"
  q_dir="$(printf '%q' "$remote_dir")"

  remote() {
    # shellcheck disable=SC2029
    ssh "${ssh_opts[@]}" "$target" "$1"
  }

  remote "umask 077 && mkdir -p $q_dir/caddy"
  scp "${ssh_opts[@]}" infra/test-stand/docker-compose.yml infra/test-stand/oauth2-proxy.cfg "$target:$remote_dir/"
  scp "${ssh_opts[@]}" infra/test-stand/Caddyfile "$target:$remote_dir/caddy/site.caddy"
  remote "umask 077 && cat > $q_dir/.env" <"$work/env"
  remote "umask 077 && cat > $q_dir/caddy/test-access.caddy" <"$work/token"

  remote "cd $q_dir && docker login ghcr.io -u $(printf '%q' "$GHCR_USER") --password-stdin && docker compose pull && docker compose up -d" <<<"$GHCR_READ_TOKEN"

  # На хосте ставим блок стенда и токен в Caddy. Главный Caddyfile с www и npm не пишем:
  # его подключает import sites/*.caddy, добавленный руками один раз.
  # Если validate или reload не прошли, возвращаем прежние файлы.
  # shellcheck disable=SC2029
  ssh "${ssh_opts[@]}" "$target" "bash -s -- $q_dir" <<'REMOTE'
set -euo pipefail
dir="$1"
caddyfile=/etc/caddy/Caddyfile
site=/etc/caddy/sites/test.my-interview.tech.caddy
token=/etc/caddy/test-access.caddy

if ! grep -Eq '^[[:space:]]*import[[:space:]]+(/etc/caddy/)?sites/\*\.caddy([[:space:]]|$)' "$caddyfile"; then
  echo "В $caddyfile нет строки import sites/*.caddy. Добавь её один раз вручную, блоки www и npm не трогай" >&2
  exit 1
fi
if ! getent group caddy >/dev/null; then
  echo "Нет группы caddy: Caddy не прочитает токен" >&2
  exit 1
fi

backup="$(mktemp -d)"
trap 'rm -rf "$backup"' EXIT

had_site=0
had_token=0
[ -f "$site" ] && cp -p "$site" "$backup/site" && had_site=1
[ -f "$token" ] && cp -p "$token" "$backup/token" && had_token=1

install -d -m 755 /etc/caddy/sites
install -m 640 -o root -g caddy "$dir/caddy/test-access.caddy" "$token"
install -m 644 "$dir/caddy/site.caddy" "$site"

if caddy validate --config "$caddyfile" --adapter caddyfile && systemctl reload caddy; then
  exit 0
fi

echo "Caddy не принял конфиг, блок test откатывается" >&2
if [ "$had_site" = 1 ]; then cp -p "$backup/site" "$site"; else rm -f "$site"; fi
if [ "$had_token" = 1 ]; then cp -p "$backup/token" "$token"; else rm -f "$token"; fi
caddy validate --config "$caddyfile" --adapter caddyfile && systemctl reload caddy
exit 1
REMOTE

  # Smoke: без заголовка доступа стенд закрыт, с ним отвечает 200
  local code
  code="$(curl -s --retry 10 --retry-delay 3 --retry-all-errors -o /dev/null -w '%{http_code}' "https://${host_name}/")"
  if [ "$code" = "200" ]; then
    echo "Без входа ${host_name} отдал 200" >&2
    exit 1
  fi
  curl -fsS --retry 10 --retry-delay 3 --retry-all-errors -H "@$work/header" -o /dev/null "https://${host_name}/"
  echo "Выложен ghcr.io/my-interview-tech/site:${sha}-test"
}

case "$mode" in
  build) build_image ;;
  deploy) deploy_image ;;
  *)
    echo "Режим: build или deploy" >&2
    exit 1
    ;;
esac
