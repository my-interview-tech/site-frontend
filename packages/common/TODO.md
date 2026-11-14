# TODO

- [x] 1 TODO: Спланируй доработку packages/common по всем вложенным TODO.

  Реализуем задачи поэтапно от одного компонента к другому, таким образом, чтобы в случае, если требуется доработка в следующем компоненте сначала делаем эту доработку, а потом пересаживаемся на целевое API.

- [x] 2 TODO: Добавляем storybook для common. Можно подсмотреть на packages/ui-kit

- [x] 3 TODO: самое ключевое, данный репозиторий мы используем не как отдельный workspace с относительным импортом, а используем опубликованную версию репозитория (сборку, после сжатий и оптимизаций и так далее).

  Закрыто пунктами 5–8 вместе с ui-kit. В workspace при совпадении версии берётся `source`. Образ сайта ставит `dist` из реестра.

- [x] 4 TODO: .cursor/\* rules и skills для работы с данным репозиторием.

  Я хочу, чтобы данный репозиторий можно было отдельно развернуть в отдельном workspace, при этом мы не меняем место хранения данного репозитория.

## Вне скоупа

Пункты 5–8 закрыты тем же порядком, что в [packages/ui-kit/TODO.md](../ui-kit/TODO.md). Пакет из `workspaces` не выносился. Пункт 9 остаётся.

- [x] 5 TODO: сборка common.

  Тот же `vite.lib.ts`: только ESM, `preserveModules`, `vite-plugin-dts`, без минификации. `react`, `react-dom`, `styled-components` и `@my-interview/ui-kit` — peer и devDependency `^1.0.0`, в бандл не входят. `react-router` нет: ссылки идут через `Link` из ui-kit. `react-markdown` и `remark-gfm` остаются `dependencies` и тоже external. `exports`: `source` на `src`, `types` и `import` на `dist`. `private` снят, версия `1.0.0`.

- [x] 6 TODO: переход сайта и пакетов на собранную версию.

  В `apps/site` версия `@my-interview/common` точная. Путь `@my-interview/common` из tsconfig убран, `include` на `useFetch` из `packages/feature-article/tsconfig.json` убран. Отдельного Vite-алиаса на `src` common нет.

- [x] 7 TODO: реестр Verdaccio.

  Отдельный реестр не поднимался: тот же, что в пункте 7 ui-kit. `@my-interview/common` в сайте — точная версия реестра, не `file:`.

- [x] 8 TODO: CI/CD публикации.

  Вместе с пунктом 8 ui-kit: turbo, Changesets и `release.yml`. Не semantic-release и не commitlint. Сайт ставит пакет из реестра в `site-pinned`.

- [ ] 9 TODO: аналитика использования компонентов.
  - Скрипт считает импорты каждого экспорта common во всех потребителях, по образцу `src/analytics` из uikit-fintech.
  - Дашборд в Storybook, чтобы удалять неиспользуемое API на основании данных. Делается вместе с аналитикой ui-kit.
