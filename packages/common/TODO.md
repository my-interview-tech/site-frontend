# TODO

- [x] 1 TODO: Спланируй доработку packages/common по всем вложенным TODO.

  Реализуем задачи поэтапно от одного компонента к другому, таким образом, чтобы в случае, если требуется доработка в следующем компоненте сначала делаем эту доработку, а потом пересаживаемся на целевое API.

- [x] 2 TODO: Добавляем storybook для common. Можно подсмотреть на packages/ui-kit

- [ ] 3 TODO: самое ключевое, данный репозиторий мы используем не как отдельный workspace с относительным импортом, а используем опубликованную версию репозитория (сборку, после сжатий и оптимизаций и так далее).

  В текущую доработку не входит, разбит на задачи в разделе «Вне скоупа». Решение пока неактуально.

- [x] 4 TODO: .cursor/\* rules и skills для работы с данным репозиторием.

  Я хочу, чтобы данный репозиторий можно было отдельно развернуть в отдельном workspace, при этом мы не меняем место хранения данного репозитория.

## Вне скоупа

Решение пока неактуально. Делается после доработки API компонентов, когда потребители уже переписаны и вынос пакета не потребует их правок. Предусловие — сборка ui-kit и static, пункты 5–6 в [packages/ui-kit/TODO.md](../ui-kit/TODO.md): собранный common нельзя поставить отдельно, пока не собран `@my-interview/ui-kit`.

- [ ] 5 TODO: отдельный workspace и сборка common.

  - `packages/common` убрать из корневых `workspaces` (вместо `packages/*` перечислить остальные пакеты). Место в репозитории не меняется.
  - Свои `tsconfig` без `extends ../../`, ESLint, Prettier, Stylelint, yarn-lockfile и `README.md`, чтобы папку можно было открыть отдельным окном Cursor.
  - Сборка в библиотечном режиме Vite: форматы `es` и `cjs`, `preserveModules` с `preserveModulesRoot: 'src'`, `vite-plugin-dts`, минификация, `sideEffects`.
  - `react`, `react-dom`, `styled-components` и `@my-interview/ui-kit` вынести в `peerDependencies` и `external`. `react-router` не нужен: ссылки идут через `Link` из ui-kit.
  - `react-markdown` и `remark-gfm` остаются `dependencies` и тоже попадают в `external`, в бандл не входят.
  - `exports` с полями `import`, `require`, `types` указывают на `dist`. Снять `private`, версия `1.0.0`.

- [ ] 6 TODO: переход сайта и пакетов на собранную версию.

  - До реестра ставить пакет из tarball: `yarn pack` и `"@my-interview/common": "file:vendor/common-1.0.0.tgz"` (по схеме 2shark, как ui-kit).
  - Убрать путь до `src` из `tsconfig.paths.workspace.json` и `tsconfig.eslint.json`: алиас `@my-interview/common`.
  - Убрать `include` на `../common/src/hooks/useFetch` из `packages/feature-article/tsconfig.json`.
  - Отдельного Vite-алиаса на `src` common нет: после tarball пакет резолвится из `node_modules`.

- [ ] 7 TODO: реестр Verdaccio.

  - Отдельный реестр не поднимать: тот же, что в пункте 7 [packages/ui-kit/TODO.md](../ui-kit/TODO.md).
  - Перевести `@my-interview/common` с `file:` на версию из реестра.

- [ ] 8 TODO: CI/CD публикации.

  - Вместе с пунктом 8 ui-kit: сборка, lint, тесты и публикация common по тегу или changeset.
  - Версия и `CHANGELOG.md` из conventional commits: `commitlint` и `semantic-release`.
  - Установка пакета из реестра в CI сайта.

- [ ] 9 TODO: аналитика использования компонентов.
  - Скрипт считает импорты каждого экспорта common во всех потребителях, по образцу `src/analytics` из uikit-fintech.
  - Дашборд в Storybook, чтобы удалять неиспользуемое API на основании данных. Делается вместе с аналитикой ui-kit.
