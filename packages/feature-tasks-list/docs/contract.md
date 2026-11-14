# Контракт списка задач

Источник правды — типы `TasksScreen`, `TaskCard` и `TasksRequest` в `src/shared/model/contract.ts`.
Публичный пакет отдаёт их из `@my-interview/feature-tasks-list`. Другого описания документа нет.

## Запрос

Хост передаёт в `TasksView`:

- `slug` — ключ загрузки;
- `crumbs` — функция `(screen) => Crumb[]`;
- `onBack` — куда вести с экрана ошибки;
- `selection` и `onSelectionChange` — необязательно, выбор фильтров снаружи. Без них выбор живёт внутри экрана.

Выбор в адрес и обратно переводят `serializeSelection` и `parseSelection`: `?difficulty=easy,hard&lang=react&tag=Hooks&status=solved`. Пустые группы и статус «Все» не пишутся, неизвестные значения отбрасываются.

## Корень документа

Обязательные ключи: `filters`, `items`, `slug`, `title`.

## Что проверяет гард

`getPageStatus(isLoading, hasError, data, REQUIRED_KEYS)` смотрит только наличие ключей корня через `isKeysInObject`.

`REQUIRED_KEYS`: `filters`, `items`, `slug`, `title`.

## Что экран показывает

- `items` — карточки в порядке документа;
- `href` карточки — ссылка на экран задачи `@my-interview/feature-task`, `id` совпадает с `id` задачи;
- `isAvailable: false` — карточка без ссылки и с замком;
- `isStudied` — галочка на карточке и фильтр «Решённые / Не решённые»; задачи, решённые в этом браузере, отмечаются поверх документа;
- `languages` — те же слаги, что `Task.language`, подписи берёт экран;
- `filters` — значения контролов: языки, сложность, темы;
- `title` — название технологии в заголовке и подпись крошки, её собирает хост.

Выбранные фильтры в документ не входят.
