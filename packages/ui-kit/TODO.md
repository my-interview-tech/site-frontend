# TODO

- [x] 1 TODO: Спланируй доработку packages/ui-kit/src/components, packages/ui-kit/src/Layout, packages/ui-kit/src/providers, packages/ui-kit/src/theme по всем вложенным TODO.

  Реализуем задачи поэтапно от одного компонента к другому, таким образом, чтобы в случае, если требуется доработка в следующем компоненте сначала делаем эту доработку, а потом пересаживаемся на целевое API.

- [x] 2 TODO: packages/ui-kit/.storybook/fixtures Смущают подобные mocks, svg берем из компонента static.

- [x] 3 TODO: самое ключевое, данный репозиторий мы используем не как отдельный workspace с относительным импортом, а используем опубликованную версию репозитория (сборку, после сжатий и оптимизаций и так далее).

  Закрыто пунктами 5–8. В workspace при совпадении версии берётся `source`. Образ сайта ставит `dist` из реестра.

- [x] 4 TODO: .cursor/* rules и skills для работы с данным репозиторием.

  Я хочу, чтобы данный репозиторий можно было отдельно развернуть в отдельном workspace, при этом мы не меняем место хранения данного репозитория.

## Вне скоупа

Пункты 5–8 закрыты. Пакеты из `workspaces` не выносились. Пункт 9 остаётся.

- [x] 5 TODO: сборка ui-kit и static.

  Пакеты остаются в корневых `workspaces`. Сборка — `vite build --config ../../vite.lib.ts`: только ESM, `preserveModules`, `vite-plugin-dts`, без минификации. `react`, `react-dom`, `react-router`, `styled-components` — peer и external. `exports`: `source` на `src`, `types` и `import` на `dist`. `private` снят, версия `1.0.0`, реестр `https://npm.my-interview.tech/`. `static` без сборки: публикуется `src`, `exports["./src/*"]`.

- [x] 6 TODO: переход сайта и пакетов на собранную версию.

  В `apps/site` версии `@my-interview/*` точные. Пока номер совпадает с пакетом, Yarn берёт `source`. Образ сайта ставит `dist` (`MY_INTERVIEW_SOURCE=0`). Пути `@my-interview/*` из tsconfig и Vite убраны. `publicDir` ищет `@my-interview/static` в `node_modules`, иначе `packages/static`. `STATIC_URL` остаётся `/src`.

- [x] 7 TODO: реестр Verdaccio.

  Конфиг — `infra/verdaccio`: scope `@my-interview` без uplink на npmjs, публикует только `ci-publisher`. `.npmrc` берёт токен из `NPM_TOKEN`, токен в репозиторий не коммитится. Зависимости сайта — точные версии реестра, не `file:`.

- [x] 8 TODO: CI/CD публикации.

  Сборка, lint и тесты — `scripts/verify.sh` и turbo. Версия и `CHANGELOG.md` — Changesets (`.changeset/config.json`, `baseBranch: release`), не semantic-release и не commitlint. Публикация — `.github/workflows/release.yml`. Сайт в CI ставит пакеты из реестра в `site-pinned`.

- [ ] 9 TODO: аналитика использования компонентов.
  - Скрипт считает импорты каждого компонента ui-kit во всех потребителях, по образцу `src/analytics` из uikit-fintech.
  - Дашборд в Storybook, чтобы удалять неиспользуемое API на основании данных.
