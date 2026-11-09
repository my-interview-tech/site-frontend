# TODO

- [x] 1 TODO: Спланируй доработку packages/ui-kit/src/components, packages/ui-kit/src/Layout, packages/ui-kit/src/providers, packages/ui-kit/src/theme по всем вложенным TODO.

  Реализуем задачи поэтапно от одного компонента к другому, таким образом, чтобы в случае, если требуется доработка в следующем компоненте сначала делаем эту доработку, а потом пересаживаемся на целевое API.

- [x] 2 TODO: packages/ui-kit/.storybook/fixtures Смущают подобные mocks, svg берем из компонента static.

- [ ] 3 TODO: самое ключевое, данный репозиторий мы используем не как отдельный workspace с относительным импортом, а используем опубликованную версию репозитория (сборку, после сжатий и оптимизаций и так далее).

  В текущую доработку не входит, разбит на задачи в разделе «Вне скоупа».

- [x] 4 TODO: .cursor/* rules и skills для работы с данным репозиторием.

  Я хочу, чтобы данный репозиторий можно было отдельно развернуть в отдельном workspace, при этом мы не меняем место хранения данного репозитория.

## Вне скоупа

Делается после доработки API компонентов, когда потребители уже переписаны и вынос пакета не потребует их правок.

- [ ] 5 TODO: отдельный workspace и сборка ui-kit и static.
  - `packages/ui-kit` и `packages/static` убрать из корневых `workspaces` (вместо `packages/*` перечислить остальные пакеты). Место в репозитории не меняется.
  - Свои `tsconfig` без `extends ../../`, ESLint, Prettier, Stylelint, yarn-lockfile и `README.md`, чтобы папку можно было открыть отдельным окном Cursor.
  - Сборка в библиотечном режиме Vite: форматы `es` и `cjs`, `preserveModules` с `preserveModulesRoot: 'src'`, `vite-plugin-dts` с `insertTypesEntry` и расширением `DefaultTheme`, минификация, `sideEffects`.
  - `react`, `react-dom`, `react-router`, `styled-components` вынести в `peerDependencies` и `external`.
  - `exports` с полями `import`, `require`, `types` указывают на `dist`. Снять `private`, версия `1.0.0`.
  - В пакет static попадают только оптимизированные `icons`, `images`, `fonts`.

- [ ] 6 TODO: переход сайта и пакетов на собранную версию.
  - До реестра ставить пакеты из tarball: `yarn pack` и `"@my-interview/ui-kit": "file:vendor/ui-kit-1.0.0.tgz"`, так же для static (по схеме 2shark в my-interview.tech).
  - Убрать путь до `src` ui-kit из `tsconfig.paths.workspace.json`, `tsconfig.eslint.json` и Vite-алиасов.
  - `publicDir` в `vite.shared.ts` перевести на `node_modules/@my-interview/static`, `STATIC_URL` в `ui-kit/constants/urls.ts` — на адрес опубликованной статики.

- [ ] 7 TODO: реестр Verdaccio.
  - Поднять Verdaccio, закрыть scope `@my-interview/*` без proxy на npmjs, выключить регистрацию, выдать токены.
  - Подключить реестр через `.npmrc` с токеном из переменной окружения, токен в репозиторий не коммитить.
  - Перевести зависимости с `file:` на версии из реестра.

- [ ] 8 TODO: CI/CD публикации.
  - Сборка, lint, тесты и публикация ui-kit и static по тегу или changeset.
  - Версия и `CHANGELOG.md` из conventional commits: `commitlint` и `semantic-release`, как в uikit-fintech.
  - Установка пакетов из реестра в CI сайта.

- [ ] 9 TODO: аналитика использования компонентов.
  - Скрипт считает импорты каждого компонента ui-kit во всех потребителях, по образцу `src/analytics` из uikit-fintech.
  - Дашборд в Storybook, чтобы удалять неиспользуемое API на основании данных.
