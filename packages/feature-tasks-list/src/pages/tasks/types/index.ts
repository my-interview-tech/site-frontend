import type { ReactNode } from 'react'

import type { TaskSelection } from '@tasks-list/features/tasks-filter'
import type { TasksScreen } from '@tasks-list/shared/model'

export type TasksViewProps = {
  /**
   * Узел над содержимым после загрузки. Хост передаёт крошки.
   */
  nav?: (screen: TasksScreen) => ReactNode

  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void

  /**
   * Новый выбор фильтров. Хост пишет его в query-строку.
   */
  onSelectionChange?: (selection: TaskSelection) => void

  /**
   * Выбор фильтров от хоста. Без него фильтры живут внутри экрана.
   */
  selection?: TaskSelection
}
