# @my-interview/common

Общие блоки продукта: статус страницы, раскладка, текст, ошибки и каталог специальностей. Примитивы — в `@my-interview/ui-kit`.

Пакет подключается исходниками как workspace: `main` указывает на `src/index.ts`. Сборки и публикации пока нет, см. [TODO.md](./TODO.md).

## Подключение

```ts
import { Columns, ErrorState, EPageStatus, Markdown } from '@my-interview/common'
```

Ссылки внутри блоков идут через `Link` из ui-kit. Хост один раз оборачивает приложение в `UiKitProvider` и `LinkProvider`.

## Экспорт

| Группа    | Экспорт                                                                          |
| --------- | -------------------------------------------------------------------------------- |
| Статус    | `EPageStatus`, `ESubscriptionAccess`, `getPageStatus`, `useFetch`                |
| Задачи    | `markSolved`, `useSolvedTasks`, `useTaskProgress`, `pluralize`, `isKeysInObject` |
| Раскладка | `PageContainer`, `Columns`, `Aside`, `PageNavBar`                                |
| Текст     | `Markdown`, `AnchorHeading`, `ListBlock`, `CodeBlock`                            |
| Навигация | `Toc`, `useActiveAnchor`                                                         |
| Состояния | `SkeletonRect`, `ErrorState`, `RouteError`, `AdSlot`, `AD_SLOT_SIZE`             |
| Прочее    | `HeaderDetails`, `ResourceCard`, `Specialties`                                   |

- `EPageStatus` — `loading`, `error`, `success`. Экран фичи ветвится по нему: скелетон, `ErrorState`, содержимое.
- `PageContainer` — фон страницы и горизонтальные поля.
- `Columns` — основная колонка и сайдбар, до 768px одна колонка. `Aside` липнет и на узком экране перестаёт.
- `Markdown` собирает CommonMark и таблицы GFM из блоков текста этого пакета.
- `CodeBlock` — код только для чтения с подсветкой Lezer (js, jsx, ts, tsx, html, css, json, bash), шапкой и кнопкой копирования. Пропсы: `children` — текст, `lang` — язык, `title` — файл или комментарий. В `Markdown` их задаёт инфо-строка ограды: ` ```tsx app/index.tsx ` или ` ```ts title="App.tsx" `.

## Структура

Раскладка как в ui-kit:

```
src/
├── components/Name/
│   ├── Name.tsx          # export const Name, TSDoc на русском
│   ├── Name.types.ts     # export type NameProps, поля с комментариями
│   ├── Name.styled.ts    # export const Styled = { ... }
│   ├── Name.constants.ts # при необходимости
│   ├── docs/Name.story.tsx
│   └── index.ts          # компонент и типы
├── hooks/                # useFetch, useActiveAnchor
├── lib/                  # getPageStatus, pluralize, taskProgress
├── constants/            # EPageStatus, ESubscriptionAccess
└── index.ts
```

Внутри пакета импорты относительные. Соседний компонент — из его `index.ts`. Снаружи пакета — только `@my-interview/common`.

## Storybook

```bash
yarn workspace @my-interview/common storybook          # localhost:6007
yarn workspace @my-interview/common storybook:build
```

- Story лежит в `docs/<Name>.story.tsx` компонента. Title — `common/components/Name`.
- Тема, `UiKitProvider` и `LinkProvider` подключает `.storybook/preview.tsx`.
- Вьюпорты 1920, 1024, 768, 375 и 320 заданы там же.
- Шрифты, иконки и картинки отдаются из `@my-interview/static` через `staticDirs`.

## Разработка

Правила для агента лежат в `.cursor/rules`: `structure`, `public-api`, `reuse-ui-kit`, `stories`. Скиллы в `.cursor/skills`: `new-component`, `change-api`.

API меняется без совместимых прослоек: старое имя не остаётся алиасом, вызовы в `apps/*` и `packages/*` обновляются в той же правке. Перед правкой: `rg "\bName\b" apps packages --glob '!packages/common/**'`.

Проверки из корня репозитория:

```bash
yarn lint     # eslint, tsc, typecheck storybook ui-kit и common, stylelint
yarn test
yarn build
yarn workspace @my-interview/common storybook:build
```

## Дальше

План выноса пакета описан в [TODO.md](./TODO.md), раздел «Вне скоупа»: отдельный workspace, сборка, tarball, Verdaccio, CI и аналитика. Решение пока неактуально и зависит от сборки ui-kit.
