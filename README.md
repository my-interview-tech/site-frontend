# my-interview.tech frontend (monorepo)

## Structure

- `apps/site` — guest zone (`my-interview.tech`, port 3000)
- `apps/main-app` — auth zone (`online.my-interview.tech`, port 3001)
- `packages/common` — общие блоки продукта: статус страницы, раскладка, текст, ошибки
- `packages/ui-kit` — theme and UI primitives
- `packages/feature-*` — isolated feature packages (article, articles-list)

Подробнее про приложения — [`apps/README.md`](apps/README.md).

## Scripts

```bash
yarn install

# dev
yarn dev              # поднять все приложение
yarn dev:site         # site (:3000)
yarn dev:main-app     # main-app (:3001)
yarn clean:vite       # сбросить кэш Vite (полезно после рефакторинга pages/)

# build
yarn build            # prod (APP_ENV=production)
yarn build:test       # test-стенд (APP_ENV=test)
yarn build:site
yarn build:main-app
yarn analyze          # bundle report для site (ANALYZE=true)
yarn preview          # preview site

# quality
yarn lint             # eslint + tsc + stylelint
yarn tslint:fix       # eslint --fix
yarn prettier
yarn test
yarn test:watch
yarn test:coverage
```

## Env

Три окружения через `APP_ENV` и файлы в `.env/.base/`:

| `APP_ENV`    | Файл              | Guest (site)                     | Auth (main-app)                         |
| ------------ | ----------------- | -------------------------------- | --------------------------------------- |
| `localhost`  | `.env.localhost`  | `http://localhost:3000`          | `http://localhost:3001`                 |
| `test`       | `.env.test`       | `https://test.my-interview.tech` | `https://online-test.my-interview.tech` |
| `production` | `.env.production` | `https://my-interview.tech`      | `https://online.my-interview.tech`      |

Скопируй `.env.example` в `.env/.base/` и используй слоистые файлы (`.env`, `.env.localhost`, `.env.test`, `.env.production`).

```bash
yarn dev                  # APP_ENV=localhost
yarn build:test           # сборка для test-стенда
yarn build                # сборка для prod
```

Клиентские переменные используют префикс `VITE_` и доступны через `import.meta.env`. Серверные (порты dev-сервера) — без префикса:

| Variable             | Description                                         |
| -------------------- | --------------------------------------------------- |
| `VITE_SITE_URL`      | guest zone URL                                      |
| `VITE_MAIN_APP_URL`  | auth zone URL                                       |
| `VITE_API_URL`       | backend API                                         |
| `VITE_COOKIE_DOMAIN` | shared cookie domain                                |
| `SITE_PORT`          | dev/preview port для site (по умолчанию `3000`)     |
| `MAIN_APP_PORT`      | dev/preview port для main-app (по умолчанию `3001`) |
