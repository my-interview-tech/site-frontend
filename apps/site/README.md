# @my-interview/site

Гостевая зона `my-interview.tech`: лендинг, каталог технологий и тонкие страницы, которые открывают экраны пакетов `feature-*`.

## Запуск

```bash
yarn dev:site                                   # из корня, http://localhost:3000
yarn workspace @my-interview/site build         # APP_ENV=production
yarn workspace @my-interview/site build:test    # APP_ENV=test
yarn workspace @my-interview/site preview
yarn analyze                                    # из корня, отчёт build/analytics/bundle-report.html
```

Окружения и переменные описаны в разделе [Env](../../README.md#env) корневого README. Папки `.env/.base/` нет в git: файлы создаются из `.env.example`.

- `VITE_API_MOCK=true` — экраны пакетов работают на моках, без backend.
- `VITE_YM_COUNTER_ID` пустой — Яндекс Метрика не подключается.

## Маршруты

Маршруты — файлы в `src/pages`, их собирает generouted. Вход подключает `@generouted/react-router/lazy`: каждая страница грузится своим чанком. `_app.tsx` и `404.tsx` входят в первый экран.

| Маршрут                      | Что открывает                                                      |
| ---------------------------- | ------------------------------------------------------------------ |
| `/`                          | лендинг: `@widgets/main-screen`, `home-*`, `Specialties` из common |
| `/about`, `/contacts`        | `@shared/ui/info-page`                                             |
| `/topics`                    | `@my-interview/feature-roadmap`                                    |
| `/topics/:tech`              | `@my-interview/feature-articles-list`                              |
| `/topics/:tech/articles/:id` | `@my-interview/feature-article`                                    |
| `/topics/:tech/quizzes/:id`  | `@my-interview/feature-quiz`                                       |
| `/topics/:tech/tasks/:id`    | `@my-interview/feature-task`                                       |
| `/tasks`                     | `@my-interview/feature-tasks-list`                                 |
| остальное                    | `404.tsx`                                                          |

`_app.tsx` — каркас: `UiKitProvider`, `LinkProvider` с `RouterLink`, шапка, футер и чат поддержки. Его `Catch` показывает `RouteError` в том же каркасе.

Страница пакета тонкая: `useParams` из `@router`, `PageFrame`, крошки, `onBack` и экран пакета. Экран статьи, задачи или квиза в сайте не живёт.

`src/router.ts` генерирует generouted, руками его не правят. Типизированные `Link`, `useParams` и `useNavigate` берутся из `@router`.

## Структура

```
src/
├── pages/      # маршруты
├── widgets/    # секции лендинга
├── features/   # *
├── entities/   # *
├── shared/     # config, constants, hooks, lib, model, ui
├── router.ts   # генерирует generouted
└── index.tsx   # Routes
```

- Алиасы `@router`, `@widgets/*`, `@features/*`, `@shared/*` заданы в [tsconfig.app.json](tsconfig.app.json).
- У `shared/ui` и `shared/model` нет барреля, импорт идёт по срезу: `@shared/ui/page-frame`, `@shared/model/guest-header`.
- Флаги блоков (авторизация, чат, cookie, меню, секции главной) лежат в `src/shared/config/featureToggles.ts`.
- Статика из `@my-interview/static` раздаётся по пути `/src/...`, см. [README пакета](../../packages/static/README.md).

## Пакеты

В монорепо пакеты подключаются исходниками: `resolve.conditions: ['source']` в [vite.shared.ts](../../vite.shared.ts). Правка в `packages/*` видна в dev без сборки пакета.

Docker-сборка ставит `MY_INTERVIEW_SOURCE=0` и берёт `dist` пакетов из Verdaccio по точным версиям из `package.json`:

- После публикации пакетов `scripts/bump-site.sh` поднимает версии в `package.json`, PR идёт из ветки `bump-site/<ветка>`.
- `yarn.lock` сайта для Docker собирает `scripts/lock-site.sh`. Файл появится после первой публикации. Пока его нет, CI и деплой пропускают сборку образа.
- CI-джоба `site-canary` собирает сайт с последними версиями пакетов (`*`), чтобы несовместимость была видна до bump.

## Размер сборки

Страницы грузятся своими чанками, React, роутер и styled-components вынесены в чанк `vendor`. Пакеты помечены `sideEffects`, поэтому неиспользуемые экспорты из барреля не попадают в бандл.

Замер до и после правки:

```bash
yarn workspace @my-interview/site build --manifest
node scripts/bundle-size.mjs --json /tmp/before.json
# правка, снова build --manifest
node scripts/bundle-size.mjs --compare /tmp/before.json
```

Скрипт печатает первый экран, догрузку каждого маршрута, воркеры и итог в raw, gzip и brotli.

После выкладки старые чанки удаляются. Если открытая вкладка не может загрузить чанк, `index.tsx` по событию `vite:preloadError` перезагружает страницу, но не чаще раза в 10 секунд.

## Выкладка

- [Dockerfile](Dockerfile): сборка на `node:24.22-alpine`, раздача через `nginx:alpine`.
- [nginx.conf](nginx.conf): `/assets/` кешируется на год как `immutable`, остальные пути отдают `index.html`.
- Test: push в `release` запускает `.github/workflows/deploy-site.yml`. Workflow собирает образ `ghcr.io/my-interview-tech/site:<sha>-test` и выкладывает его на `test.my-interview.tech` за oauth2-proxy (`infra/test-stand`). Повторная выкладка или откат — ручной запуск с `sha`.
- Prod этим workflow не выкладывается. Без `DEPLOY_PRODUCTION=true` шаг пропускается, с ней скрипт падает, чтобы не подменить текущий www.

## Проверки

```bash
yarn workspace @my-interview/site lint
yarn workspace @my-interview/site lint:styled
yarn workspace @my-interview/site typecheck
yarn workspace @my-interview/site test
```
