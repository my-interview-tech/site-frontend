# Контракт задачи

Источник правды — типы `Task`, `TaskRequest`, `SubmitInput`, `RunInput` и `RunReport` в `src/shared/model/contract.ts`.
Публичный пакет отдаёт их из `@my-interview/feature-task`. Другого описания документа нет.

## Запрос

Хост передаёт в `TaskView`:

- `id` и `tech` — ключ загрузки; `tech` из адреса — ещё и ключ черновика и прогресса;
- `crumbs` — функция `(task) => Crumb[]`;
- `onBack` — куда вести с экрана ошибки;
- `tasksHref` — адрес разводящей задач для ссылки «Все задачи»;
- `draftStorage` — необязательно, где хранить черновик; по умолчанию `localStorage`;
- `onSolved` — необязательно, «Сдать» прошло все тесты; локальная отметка уже стоит;
- `onRunComplete` — необязательно, отчёт каждого прогона и его режим.

Раннеры для языков вне воркера хост подключает через `TaskRunnerProvider`. Раннер провайдера важнее встроенного.

## Корень документа

Обязательные ключи: `hiddenCount`, `id`, `language`, `lead`, `starter`, `statement`, `tech`, `tests`, `title`.

Необязательный ключ: `hints` — имена для автодополнения сверх глобалов языка.

## Что проверяет гард

`getPageStatus(isLoading, hasError, data, REQUIRED_KEYS)` смотрит только наличие ключей корня через `isKeysInObject`.

`REQUIRED_KEYS`: `hiddenCount`, `id`, `language`, `lead`, `starter`, `statement`, `tech`, `tests`, `title`.

## Что экран показывает

- `language` — бейдж в шапке условия, язык редактора и набор правил ESLint;
- `title` и `lead` — заголовок и подзаголовок условия;
- `statement` — абзацы условия;
- `tests` — открытые тесты списком: название и код. После прогона строки `describe` и `it` зелёные или красные, причина падения — под `it`;
- `hiddenCount` — счётчик скрытых тестов под списком;
- `starter` — стартовый код в редакторе и точка «Сбросить».

## Скрытые тесты

Скрытые тесты в документ не входят. Клиент знает только их число.

<!-- TODO: Backend в разработке -->

«Сдать» вызывает `submitTask({ code, id, language, tech })`. Пока это мок: скрытые тесты лежат в слое `shared/api`, прогон идёт тем же `runTask`. С бэкендом меняется только `submitTask`, отчёт остаётся `RunReport`.

У скрытого кейса в отчёте `hidden: true`, без `message` и `errorAt`.
`logs` — вывод `console` за прогон, по порядку. У записи есть `level`, `text` и, если вызов был внутри теста, `title`.
Отдельного контракта input/output нет: тест — это код с `assert` или `expect`.
Адрес разводящей приходит от хоста, в документе его нет.

## Тест

Тест — тело async-функции. В области видимости:

- `solution` — экспорты решения, свежие на каждый тест;
- `assert` — `equal`, `deepEqual`, `ok`;
- `expect(value)` — `toBe`, `toEqual`, `toBeTruthy`, `toBeFalsy`, `toContain`, `toThrow`, и те же матчеры через `.not`. Сообщение о провале: `Expected` / `Received`, как у `assert`;
- `describe(name, fn)`, `it(name, fn)`, `test` — синоним `it`. В одном тесте один `it`: тело теста только регистрирует кейс, раннер выполняет его отдельно. `describe` синхронный, `await` пишите внутри `it`. Без `it` тело выполняется сразу, как раньше;
- для React — `React`, `render`, `screen`, `within`, `fireEvent`, `act` из `@testing-library/dom` поверх linkedom.

Название кейса в условии — путь первого `it` при загрузке задачи: `describe('Counter', () => { it('считает клики', …) })` даёт `Counter › считает клики`. Имя — строка или шаблон без подстановок. Если `it` нет, остаётся `title` из документа.

`render(<C />)` или `render(C)` возвращает запросы testing-library по контейнеру, `container`, `rerender` и `unmount`. После теста деревья размонтируются, документ очищается.
