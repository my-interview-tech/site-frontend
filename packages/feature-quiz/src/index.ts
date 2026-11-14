/**
 * Публичный контракт `@my-interview/feature-quiz`.
 *
 * Импорт только из `@my-interview/feature-quiz`.
 * Слайсы пакета (`pages`, `widgets`, `features`, `entities`, `shared`) снаружи недоступны.
 *
 * Экран читает тему из `UiKitProvider` из `@my-interview/ui-kit`.
 */

/** Экран квиза: сам грузит документ и показывает скелетон, ошибку или форму. */
export { QuizView } from './pages/quiz'

/** Пропсы `QuizView`: `id`, `tech`, `nav`, `onBack`, `onSolved`. */
export type { QuizViewProps } from './pages/quiz'

/** Квиз без ключа ответов и параметры его загрузки. */
export type { Quiz, QuizRequest } from './shared/model'
