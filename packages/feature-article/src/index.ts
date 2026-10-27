/**
 * Публичный контракт `@my-interview/feature-article`.
 *
 * Импорт только из `@my-interview/feature-article`.
 * Слайсы пакета (`entities`, `pages`, `widgets`, `features`, `shared`) снаружи недоступны.
 *
 * Из этого репозитория вместе с пакетом используется `@my-interview/ui-kit`:
 * `Crumb` для крошек и `ThemeModeProvider`, потому что экран читает тему из него.
 */

/** Экран статьи: сам грузит данные и показывает ошибку, скелетон или содержимое. */
export { ArticleView } from './pages/article'

/** Пропсы `ArticleView`: `id`, `tech`, `crumbs`, `onBack`. */
export type { ArticleViewProps } from './pages/article'

/** Документ статьи и параметры его загрузки. */
export type { Article, ArticleRequest } from './shared/model'
