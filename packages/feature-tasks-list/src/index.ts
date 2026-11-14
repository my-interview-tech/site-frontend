/**
 * Публичный контракт `@my-interview/feature-tasks-list`.
 *
 * Импорт только из `@my-interview/feature-tasks-list`.
 * Слайсы пакета (`pages`, `widgets`, `features`, `entities`, `shared`) снаружи недоступны.
 *
 * Экран читает тему из `UiKitProvider` из `@my-interview/ui-kit`.
 */

/** Разводящая задач: сама грузит список и показывает скелетон, ошибку или карточки с фильтрами. */
export { TasksView } from './pages/tasks'

/** Пропсы `TasksView`: `nav`, `onBack`. Адреса задач приходят в карточках. */
export type { TasksViewProps } from './pages/tasks'

/** Выбор фильтров для управляемого режима `TasksView`. */
export type { TaskSelection, TaskStatusFilter } from './features/tasks-filter'

/** Экран списка, карточка задачи и параметры загрузки. */
export type { TaskCard, TasksScreen } from './shared/model'
