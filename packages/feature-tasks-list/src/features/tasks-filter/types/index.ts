import type { TaskDifficulty, TaskFilters } from '@tasks-list/shared/model'

/**
 * Фильтр по отметке «решено».
 */
export type TaskStatusFilter = 'all' | 'solved' | 'unsolved'

/**
 * Порядок списка.
 */
export type TaskSort = 'date' | 'default' | 'difficulty' | 'popularity'

/**
 * Направление сортировки. `asc` — сверху меньшие значения.
 */
export type SortOrder = 'asc' | 'desc'

/**
 * Выбор пользователя. Пустая группа не фильтрует.
 */
export type TaskSelection = {
  /**
   * Выбранные компании.
   */
  companies: string[]

  /**
   * Выбранные уровни сложности.
   */
  difficulties: TaskDifficulty[]

  /**
   * Выбранные языки.
   */
  languages: string[]

  /**
   * Направление сортировки.
   */
  order: SortOrder

  /**
   * Только закрытые задачи Premium. Выключено — без ограничения.
   */
  premium: boolean

  /**
   * Подстрока названия.
   */
  query: string

  /**
   * Порядок списка.
   */
  sort: TaskSort

  /**
   * Решённые, нерешённые или все.
   */
  status: TaskStatusFilter

  /**
   * Выбранные темы.
   */
  tags: string[]
}

export type TasksFilterProps = {
  /**
   * Значения для контролов.
   */
  filters: TaskFilters

  /**
   * Панель внутри шторки: без своей рамки и фона.
   */
  inDrawer?: boolean

  /**
   * Новый выбор.
   */
  onChange: (selection: TaskSelection) => void

  /**
   * Текущий выбор.
   */
  selection: TaskSelection
}
