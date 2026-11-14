import type { TaskSelection } from '@tasks-list/features/tasks-filter'
import type { TasksScreen } from '@tasks-list/shared/model'

/** Вкладка каталога. */
export type CatalogTab = 'favorites' | 'list'

export type TasksContentProps = TasksScreen & {
  /**
   * Новый выбор фильтров. Вместе с `selection` делает фильтры управляемыми.
   */
  onSelectionChange?: (selection: TaskSelection) => void

  /**
   * Выбор фильтров снаружи, например из query-строки. Без него фильтры живут внутри экрана.
   */
  selection?: TaskSelection
}
