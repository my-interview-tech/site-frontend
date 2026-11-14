import type { SortOrder, TaskSort } from '@tasks-list/features/tasks-filter'

export const SORT_OPTIONS: readonly { id: TaskSort; label: string }[] = [
  { id: 'default', label: 'По умолчанию' },
  { id: 'difficulty', label: 'По сложности' },
  { id: 'date', label: 'По дате' },
  { id: 'popularity', label: 'По популярности' },
]

export const featureToggles = {
  /**
   * Вкладки каталога.
   * @description «Список задач» и «Избранное». Пока раздел не внедрён, скрыты.
   */
  catalogTabs: false,
} as const

/** Направление, с которого начинается каждая сортировка. */
export const SORT_ORDER = {
  date: 'desc',
  default: 'asc',
  difficulty: 'asc',
  popularity: 'desc',
} as const satisfies Record<TaskSort, SortOrder>

export const TEXT = {
  CATALOG: 'Разделы каталога',
  EMPTY: 'Ничего не нашли',
  EMPTY_FAVORITES: 'В избранном пока пусто',
  EMPTY_FAVORITES_HINT: 'Отметьте задачу закладкой, чтобы вернуться к ней.',
  EMPTY_HINT: 'Уберите часть фильтров, чтобы увидеть больше задач.',
  FAVORITES: 'Избранное',
  FILTERS: 'Фильтры',
  LIST: 'Список задач',
  RESET: 'Сбросить фильтры',
  SEARCH: 'Поиск по названию',
  SORT: 'Сортировка',
  SORT_ASC: 'Сверху вниз',
  SORT_DESC: 'Снизу вверх',
} as const
