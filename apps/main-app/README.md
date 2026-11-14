# @my-interview/main-app

Авторизованная зона: `online.my-interview.tech`, test — `online-test.my-interview.tech`, локально порт 3001.

Сейчас это заготовка: один маршрут `/` с «Hello World» внутри `UiKitProvider`.

## Запуск

```bash
yarn dev:main-app                                   # из корня, http://localhost:3001
yarn workspace @my-interview/main-app build         # APP_ENV=production
yarn workspace @my-interview/main-app build:test    # APP_ENV=test
yarn workspace @my-interview/main-app preview
```

Переменные окружения общие с сайтом, см. [Env](../../README.md#env) в корневом README. Порт задаёт `MAIN_APP_PORT`.

## Структура

```
src/
├── pages/          # маршруты generouted: _app.tsx и index.tsx
├── application/    # пусто
├── views/          # пусто
├── widgets/        # пусто
├── features/       # пусто
├── entities/       # пусто
├── shared/         # пусто
├── router.ts       # генерирует generouted, руками не править
└── index.tsx       # вход: Routes из @generouted/react-router
```

Алиасы слоёв (`@pages/*`, `@widgets/*`, `@features/*`, `@shared/*` и другие) заданы в [tsconfig.app.json](tsconfig.app.json). Алиаса `@router`, как у сайта, здесь пока нет.

Новая фича делается отдельным пакетом `packages/feature-*`, приложение только подключает её экран.

## Сборка

Конфиг общий с сайтом: [vite.shared.ts](../../vite.shared.ts). Там же vendor-чанк для React, роутера и styled-components.

Маршруты подключаются без ленивой загрузки. Когда страниц станет больше, вход стоит перевести на `@generouted/react-router/lazy`, как в `apps/site`.

## Ограничения

- `@my-interview/ui-kit` импортируется в `_app.tsx`, но не указан в `dependencies`. В монорепо он находится через workspace. Для отдельной сборки зависимость нужно добавить.
- Своего Dockerfile и деплоя нет. Changesets приложение не версионируют (`ignore` в `.changeset/config.json`).

## Проверки

```bash
yarn workspace @my-interview/main-app lint
yarn workspace @my-interview/main-app lint:styled
yarn workspace @my-interview/main-app typecheck
yarn workspace @my-interview/main-app test
```
