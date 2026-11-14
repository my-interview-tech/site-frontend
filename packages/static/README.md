# @my-interview/static

Статика продукта: шрифты, иконки, картинки и анимации. Кода в пакете нет, только файлы в `src/` и скрипты их обработки.

## Как раздаётся

Пакет подключён как `publicDir` Vite в `site` и `main-app` ([vite.shared.ts](../../vite.shared.ts)). Файлы доступны от корня сайта по пути `/src/<папка>/<файл>`. Папка ищется по порядку: `apps/<app>/node_modules/@my-interview/static`, корневой `node_modules`, затем `packages/static`.

Storybook `ui-kit` и `common` отдают `fonts`, `icons` и `images` по тем же путям через `staticDirs`.

Кто берёт файлы:

| Где                                                                   | Путь                                             |
| --------------------------------------------------------------------- | ------------------------------------------------ |
| `Icon`, `IconButton`, `Badge` из ui-kit                               | `/src/icons/<iconSrc>.svg`                       |
| Шрифты темы ui-kit                                                    | `/src/fonts/Inter-<Weight>/Inter-<Weight>.<ext>` |
| `STATIC_URL` из ui-kit, `asset()` из `apps/site/src/shared/constants` | `/src/<файл>`                                    |
| favicon в `apps/site/index.html`                                      | `/src/icons/logo-mark.png`                       |
| Анимация главной (`useLottieAnimation`)                               | `/src/animations/hero-mesh.json`                 |

## Структура

```
src/
├── icons/        # svg иконок и логотипов, logo-mark.png, structure.json — реестр имён
├── images/       # иллюстрации png и svg
├── fonts/        # Inter Regular, Medium, SemiBold, Bold: eot, woff2, woff, ttf, svg и лицензия
├── animations/   # lottie json
└── documents/    # пока пусто
```

## Иконки

- Имя в kebab-case: `icon-<имя>.svg`. В `Icon` передаётся без расширения: `<Icon iconSrc="icon-chevron" />`.
- `viewBox` обязателен, размеры квадратные. Направленная иконка рисуется смотрящей вправо, поворот задаёт `direction`.
- `Icon` красит форму маской и берёт только прозрачность. Вырезы в знаке делаются прозрачными, а не белой заливкой. Многоцветный или растровый логотип выводится через `Image`.
- `icons/structure.json` — список имён всех svg. Его читает story «Библиотека иконок» в Storybook ui-kit.

## Скрипты

```bash
yarn workspace @my-interview/static svgo             # svgo по icons и images, затем structure.json
yarn workspace @my-interview/static icons:structure  # только пересобрать structure.json
```

Конфиг svgo — [svgo.config.js](svgo.config.js): `preset-default` и `multipass`.

При коммите lint-staged прогоняет svgo по изменённым svg в `icons` и `images` и запускает `buildIconsStructure.cjs --check`. Коммит падает, если новая иконка не попала в `structure.json`.

## Публикация

Пакет публикуется в Verdaccio `npm.my-interview.tech` через changesets вместе с остальными пакетами. В tarball попадает только `src`, экспорт `./src/*`.

В монорепо сайт берёт файлы из workspace. Docker-сборка сайта ставит пакет из реестра по версии из `apps/site/package.json`.
