/**
 * Публичный контракт `@my-interview/feature-task`.
 *
 * Импорт только из `@my-interview/feature-task`.
 * Слайсы пакета (`pages`, `widgets`, `features`, `entities`, `shared`) снаружи недоступны.
 *
 * Экран читает тему из `UiKitProvider` из `@my-interview/ui-kit`.
 */

/** Экран задачи: сам грузит данные и показывает скелетон, ошибку или рабочую область. */
export { TaskView } from './pages/task'

/** Пропсы `TaskView`: `id`, `tech`, `nav`, `onBack`, `tasksHref`, `draftStorage`, `onSolved`, `onRunComplete`. */
export type { TaskViewProps } from './pages/task'

/** Внешние раннеры для языков вне воркера. */
export { TaskRunnerProvider } from './shared/lib'
export type { DraftStorage, TaskRunnerProviderProps } from './shared/lib'

/** Документ задачи, параметры загрузки, прогон и его отчёт. */
export type {
  ConsoleEntry,
  ConsoleLevel,
  RunInput,
  RunMode,
  RunOptions,
  RunReport,
  Task,
  TaskCaseResult,
  TaskRequest,
  TaskRunner,
} from './shared/model'
