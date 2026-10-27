# Контракт статьи

Источник правды — типы `Article` и `ArticleRequest` в `src/shared/model/contract.ts`.
Публичный пакет отдаёт их из `@my-interview/feature-article`. Другого описания документа нет.

## Запрос

Хост передаёт в `ArticleView`:

- `id` и `tech` — ключ загрузки;
- `crumbs` — функция `(article) => Crumb[]`;
- `onBack` — куда вести с экрана ошибки.

## Корень документа

Обязательные ключи и у открытой, и у закрытой статьи:
`id`, `title`, `access`, `accordion`, `content`, `meta`, `toc`, `tocLabel`.

Опционально на корне: `badge`, `ad`.

`access`:

- `open` — статьи без `offer`;
- `subscription` — есть `offer`. В `content.markdown` приходит только открытая часть.

## Что проверяет гард

`getPageStatus(isLoading, hasError, data, REQUIRED_KEYS)` смотрит только наличие ключей корня через `isKeysInObject`.

`REQUIRED_KEYS`: `id`, `title`, `access`, `accordion`, `content`, `meta`, `toc`, `tocLabel`.

## Что экран показывает

- `accordion` — шапка;
- `badge` — плашка у крошек, если ключ есть;
- `content.markdown` — тело, CommonMark. Якорь заголовка — суффикс `{#id}` в конце строки;
- `content.resources` — карусель, если массив не пустой;
- `content.previousStep` / `nextStep` — соседи, `null` скрывает сторону;
- `meta` — карточка навыка и шторка;
- `toc` и `tocLabel` — оглавление;
- `ad` — рекламный слот;
- `offer` — на месте продолжения, если `access === 'subscription'`.
