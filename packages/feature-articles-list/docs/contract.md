# Контракт технологии

Источник правды — типы `TechnologyScreen` и `TechnologyRequest` в `src/shared/model/contract.ts`.
Публичный пакет отдаёт их из `@my-interview/feature-articles-list`. Другого описания документа нет.

## Запрос

Хост передаёт в `TechnologyView`:

- `slug` — ключ загрузки;
- `crumbs` — функция `(screen) => Crumb[]`;
- `onBack` — куда вести с экрана ошибки.

## Корень документа

Обязательные ключи: `accordion`, `recommendations`, `resources`, `sections`, `slug`, `title`, `toc`, `tocLabel`.

Опционально на корне: `ad`.

## Что проверяет гард

`getPageStatus(isLoading, hasError, data, REQUIRED_KEYS)` смотрит только наличие ключей корня через `isKeysInObject`.

`REQUIRED_KEYS`: `accordion`, `recommendations`, `resources`, `sections`, `slug`, `title`, `toc`, `tocLabel`.

## Что экран показывает

- `accordion` — шапка;
- `sections` — список материалов;
- `resources` — карусель, если массив не пустой;
- `recommendations` — карточка в колонке и шторка;
- `toc` и `tocLabel` — оглавление;
- `ad` — рекламный слот, если ключ есть;
- `title` — подпись крошки, её собирает хост.
