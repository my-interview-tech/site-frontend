/**
 * Публичный контракт `@my-interview/feature-articles-list`.
 *
 * Импорт только из `@my-interview/feature-articles-list`.
 * Слайсы пакета (`pages`, `widgets`, `features`, `entities`, `shared`) снаружи недоступны.
 *
 * Экран читает тему из `ThemeModeProvider` из `@my-interview/ui-kit`.
 */

/** Экран технологии: сам грузит данные и показывает скелетон, ошибку или список материалов. */
export { TechnologyView } from './pages/technology'

/** Пропсы `TechnologyView`: `slug`, `crumbs`, `onBack`. Адреса ссылок приходят в данных экрана. */
export type { TechnologyViewProps } from './pages/technology'

/** Экран технологии, материал и параметры загрузки. */
export type { TechnologyItem, TechnologyRequest, TechnologyScreen } from './shared/model'

/** Загрузка технологии по слагу: название для крошек на странице задачи. */
export { loadTechnology } from './shared/api'
