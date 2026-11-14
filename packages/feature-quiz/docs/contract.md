# Контракт квиза

Источник правды — типы `Quiz` и `QuizRequest` в `src/shared/model/contract.ts`.
Публичный пакет отдаёт их из `@my-interview/feature-quiz`. Ключ верных ответов в публичный `Quiz` не входит.

## Запрос

Хост передаёт в `QuizView`:

- `id` и `tech` — ключ загрузки;
- `nav` — функция `(quiz) => ReactNode`. Крошки собирает хост;
- `onBack` — куда вести с экрана ошибки;
- `onSolved` — вызывается один раз, если все ответы верные. Аргумент: `{ id, tech }`.

## Корень документа

Обязательные ключи загруженного документа:

`id`, `title`, `topicTitle`, `processId`, `serverDate`, `pages`, `answers`, `intro`, `questionSeconds`, `retryAt`, `ad`.

`answers` — карта `id` вопроса на `id` верного варианта. На шаге не рисуется и в `Quiz` для хоста не попадает.

`intro.checks` — что проверяет квиз. `intro.rules` — правила перед стартом.

`questionSeconds` — секунд на один вопрос.

`retryAt` — unix-секунды следующей попытки. `null` — можно начать сейчас. Сравнивается с `serverDate.value`, не с часами браузера. 12 часов задаёт бэкенд самим `retryAt`.

`ad` — `id`, `label`, `caption` правого слота.

`pages` — шаги. Шаг — массив компонентов.

## Компоненты шага

- `title` — заголовок шага. Поля: `id`, `visibility`, `label`;
- `choice` — один вопрос. Поля: `id`, `visibility`, `label`, `options[]` (`id`, `label`). Верный вариант в компоненте не лежит;
- `navBar` — подпись шага. Поля: `id`, `label`, `isCloseAvailable`, `isStepBackAvailable`;
- `footerButton` — кнопка. Поля: `id`, `type: 'primary'`, `label`, `buttonAction`. `toForm` — следующий шаг, `submit` — сдача.

`input`, маски и `REGEXP` пакет не читает.

## Что проверяет гард

`getPageStatus(isLoading, hasError, data, REQUIRED_KEYS)` смотрит только наличие ключей корня через `isKeysInObject`.

`REQUIRED_KEYS`: `id`, `title`, `topicTitle`, `processId`, `serverDate`, `pages`, `answers`, `intro`, `questionSeconds`, `retryAt`, `ad`.

Гард не проверяет состав шага и что у каждого `choice` есть верный ключ в `answers`.
