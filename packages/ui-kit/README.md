# @my-interview/ui-kit

Дизайн-система my-interview: токены, примитивы раскладки и компоненты интерфейса.

- Статика (иконки, картинки, шрифты) лежит в соседнем пакете `@my-interview/static`.
- Пакет подключается исходниками как workspace: `main` указывает на `src/index.ts`. Сборки и публикации пока нет, см. [TODO.md](./TODO.md).

## Подключение

`UiKitProvider` ставится один раз в корне приложения. Внутри него тема (светлая или тёмная), брейкпоинт для `useBreakpoint`, шрифт Inter, normalize и глобальные стили.

`LinkProvider` передаёт ui-kit ссылку роутера. Без него `Link` и `Breadcrumb` рисуют обычный `<a>`. Кнопка-ссылка — `ButtonBase` с `as={Link}` и `href`, на `styled(ButtonBase)` — с `forwardedAs={Link}`.

```tsx
import { LinkProvider, UiKitProvider } from '@my-interview/ui-kit'

import { RouterLink } from '@shared/ui/router-link'

export const App = ({ children }: AppProps) => (
  <UiKitProvider>
    <LinkProvider component={RouterLink}>{children}</LinkProvider>
  </UiKitProvider>
)
```

Тема читается и переключается через `useThemeMode()` внутри `UiKitProvider`.

## Токены

`theme` импортируется напрямую, без `ThemeProvider` и колбэков `({ theme }) =>`.

```ts
import styled from 'styled-components'

import { textStyle, theme } from '@my-interview/ui-kit'

const Caption = styled.p`
  ${textStyle(200, { weight: 'medium', tracking: 'wide', uppercase: true })}
  border-radius: ${theme.radii.r8}px;
  box-shadow: ${theme.shadows.sm};
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacings.s4}px ${theme.spacings.s8}px;
`
```

| Группа        | Ключи                                                      | Значение                                              |
| ------------- | ---------------------------------------------------------- | ----------------------------------------------------- |
| `colors`      | `textPrimary`, `accent`, `surface`, `border`, `hero` и др. | CSS-переменные `--color-*`, свои для светлой и тёмной |
| `shadows`     | `sm`, `md`, `lg`, `overlay`, `up`, `accent`                | CSS-переменные `--shadow-*`                           |
| `spacings`    | `s0`–`s96`                                                 | px, число                                             |
| `radii`       | `r2`–`r32`, `rPill`                                        | px, число                                             |
| `breakpoints` | `mobile`, `tablet`, `desktopXS`–`desktopXL`                | ширина в px                                           |
| `container`   | `maxWidth`, `padding`, `paddingTablet`, `paddingMobile`    | px                                                    |

Так как цвета и тени — переменные, смена темы не пересоздаёт стили и не требует `ThemeProvider` у потребителя.

Типографика:

- шкала из шагов `100`–`1000`: кегль и интерлиньяж задаются шагом, `400` — основной текст 14/22, `1000` — заголовок героя 52/58;
- начертания: `regular`, `medium`, `semibold`, `bold`;
- трекинг: `tighter`, `tight`, `wide`;
- в CSS используется `textStyle(step, options)`, в JSX — `<Text font={step}>`.

Медиа:

- одна шкала, как у пропсов брейкпоинтов: `mobile` < 768 ≤ `tablet` < 960 ≤ `desktopXS` < 1280 ≤ `desktopS` < 1440 ≤ `desktopM` < 1680 ≤ `desktopL` < 1920 ≤ `desktopXL`;
- стили ui-kit mobile-first: база для телефона, `@media (min-width: ${theme.breakpoints.tablet}px)` и шире;
- в логике `useBreakpoint()`: `breakpoint`, `isMobile`, `isTablet`, `isDesktop`. Подписка на `matchMedia` одна на приложение, её держит `UiKitProvider`. Без провайдера хук отдаёт `desktopS`;
- продуктовые стили пока пишут `@media (max-width: ${theme.breakpoints.tablet}px)`: на ровно 768px они расходятся со шкалой на 1px.

## Компоненты

| Группа    | Компоненты                                                                                    |
| --------- | --------------------------------------------------------------------------------------------- |
| Раскладка | `Flex`, `Grid` / `GridItem`, `Divider`                                                        |
| Текст     | `Text`, `Title`, `Code`                                                                       |
| Действия  | `Button`, `ButtonBase`, `IconButton`, `Chip`, `Link`                                          |
| Контент   | `Accordion`, `Badge`, `BottomSheet`, `Breadcrumb`, `Carousel`, `Cell`, `Indicator`, `Spinner` |
| Медиа     | `Icon`, `Image`                                                                               |

Поля страницы — `PageContainer` в `@my-interview/common`. Токен `theme.container` остаётся в ui-kit.

Хуки: `useBreakpoint`, `useThemeMode`, `useLink`. Стеклянные поверхности с бликом за курсором: `glassOnHero`, `glassOnSurface`, `lensHover`, `placeLens`.

Как пользоваться:

- `Flex` и `Grid` принимают раскладку пропсами, в том числе по брейкпоинтам: `desktopS={{ p: '0 140px' }}`;
- в `styled(Flex)` остаётся только то, чего у `Flex` нет: фон, анимация, `max-width`;
- `ButtonBase` — сброс кнопки с полиморфным `as` и `isLoading`, основа кнопок ui-kit. В продуктовом коде используются `Button` и `IconButton`;
- `isLoading` у любой кнопки прячет содержимое и рисует `Spinner` по центру: ширина не меняется, ставится `aria-busy`;
- `Accordion` раскрывается сам или по `isOpen` и `onToggle` от родителя, например когда в списке открыт один пункт;
- на `styled(ButtonBase)` или `styled(Flex)` тег передаётся через `forwardedAs`: `as` подменил бы сам компонент.

```tsx
import { Button, Flex, Icon, Text, theme } from '@my-interview/ui-kit'

export const Promo = ({ onStart }: PromoProps) => (
  <Flex alignItems="center" flexDirection="column" gap={theme.spacings.s16}>
    <Text color={theme.colors.textSecondary} font={400}>
      Бесплатный старт
    </Text>
    <Button size={48} variant="primary" onClick={onStart}>
      <Icon iconSrc="icon-check" />
      Начать
    </Button>
  </Flex>
)
```

У `Button` варианты `primary`, `secondary`, `glass`, `ghost`, `inverse`, `text` и высоты `32`, `40`, `48`, `56`. Ховер есть у всех вариантов на устройствах с курсором. `shape="rect"` скругляет на 10px, `shape="round"` делает капсулу; у `text` форма не действует. `isSelected` у `text` подсвечивает выбранный пункт. У `glass` то же скругление, что у остальных.

`IconButton` — круглая кнопка с одной иконкой:

```tsx
<IconButton iconSrc="icon-cross" label="Закрыть" onClick={onClose} />
<IconButton iconSrc="icon-bookmark" label="Сохранить" variant="text" onClick={onSave} />
```

- `iconSrc` — имя иконки из static, `iconDirection` поворачивает её;
- `variant`: `secondary` (поверхность с рамкой), `glass` (стекло на поверхности), `ghost` (стекло на герое), `text` (без фона и рамки);
- `label` обязателен, `isOpen` ставит `aria-expanded` и держит вид ховера.

`Chip`: `variant="round"` — капсула выбора с `isSelected`, `variant="rect"` — прямоугольная метка без действия.

`Code` — моноширинный текст. `variant="inline"` (по умолчанию) — фрагмент в строке с фоном и радиусом. `variant="block"` — `pre` с горизонтальной прокруткой.

```tsx
<Text font={400}>
  Проверка <Code>document.doctype</Code>
</Text>
<Code variant="block">{'const value = 1'}</Code>
```

`STATIC_URL` — корень статики `@my-interview/static`. Сейчас это `/src`, тот же адрес, с которого `Icon` и `Image` читают файлы.

## Иконки

- SVG лежат в `packages/static/src/icons`.
- `<Icon iconSrc="icon-check" />` рисует файл CSS-маской: от SVG берётся только форма, цвет — `color` или `currentColor` родителя.
- Многоцветные логотипы и картинки вроде `error-close` рисуются через `Image`, не через `Icon`.
- `direction` поворачивает направленные иконки (`icon-chevron`), смена направления анимируется.
- Все иконки видны в story `ui-kit/docs/Библиотека иконок`.
- Новая иконка:

  1. положить SVG в `src/icons`;
  2. запустить `yarn workspace @my-interview/static svgo`: оптимизация и пересборка `structure.json`.

  Цвет внутри файла не важен, маска берёт только альфу: вырезы делаются прозрачными, например `fill-rule="evenodd"`. Инлайновые `<svg>` в компонентах не пишутся.

## Storybook

```bash
yarn storybook                                      # localhost:6006
yarn workspace @my-interview/ui-kit storybook:build
```

- Stories лежат рядом с компонентом в `docs/<Name>.story.tsx`, сайдбар отсортирован по алфавиту.
- Тема переключается в тулбаре.
- Вьюпорты 1920, 1024, 768, 375 и 320 заданы в `.storybook/preview.tsx`.
- Шрифты, иконки и картинки отдаются из `@my-interview/static` через `staticDirs`, моков в пакете нет: `` src: `${ICONS_URL}/logo-mark.svg` ``, растр — `` src: `${STATIC_URL}/images/quiz-think.png` ``.

## Разработка

Структура компонента:

```
components/Name/
├── Name.tsx          # export const Name, TSDoc на русском
├── Name.types.ts     # export type NameProps, поля с комментариями
├── Name.styled.ts    # export const Styled = { ... }, транзиентные $props
├── Name.constants.ts # при необходимости
├── docs/Name.story.tsx
└── index.ts          # компонент и типы
```

Правила:

- Публичный API — только `src/index.ts`. Новый компонент экспортируется оттуда вместе с типами.
- API меняется без совместимых прослоек: старые пропсы не остаются алиасами, все вызовы в `apps/*` и `packages/*` обновляются в той же правке.
- Булевы пропсы называются `isX` / `hasX`. `enum`, `any` и `style={{}}` не используются.

Правила для агента лежат в `.cursor/rules`: `tokens`, `component-structure`, `stories`, `public-api`. Скиллы в `.cursor/skills`: `new-component`, `change-token`, `new-icon`.

Проверки перед правкой запускаются из корня репозитория:

```bash
yarn lint     # eslint, tsc, typecheck:storybook, stylelint
yarn test
yarn build
yarn workspace @my-interview/ui-kit storybook:build
```

## Дальше

План выноса пакета описан в [TODO.md](./TODO.md), раздел «Вне скоупа»:

- отдельный workspace;
- библиотечная сборка Vite в `dist`;
- установка из tarball, затем из Verdaccio;
- CI-публикация `1.0.0`;
- аналитика использования компонентов.
