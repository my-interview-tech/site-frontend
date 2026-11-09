import type { TaskCard } from '@tasks-list/shared/model'

import type { TaskSelection, TaskSort, SortOrder } from '../../types'

const matchesAny = <T>(selected: readonly T[], values: readonly T[]): boolean =>
  selected.length === 0 || values.some((value) => selected.includes(value))

/**
 * Задачи под выбор. Внутри группы — любое из значений, между группами — все группы сразу.
 */
export const filterTasks = (items: readonly TaskCard[], selection: TaskSelection): TaskCard[] => {
  const needle = selection.query.trim().toLowerCase()

  return items.filter(
    (item) =>
      (needle === '' || item.title.toLowerCase().includes(needle)) &&
      matchesAny(selection.languages, item.languages) &&
      matchesAny(selection.difficulties, [item.difficulty]) &&
      matchesAny(selection.tags, item.tags) &&
      matchesAny(
        selection.companies,
        item.companies.map((itemCompany) => itemCompany.id)
      ) &&
      (selection.status === 'all' || item.isStudied === (selection.status === 'solved')) &&
      (!selection.premium || !item.isAvailable)
  )
}

/**
 * Порядок списка. `default` оставляет порядок каталога.
 */
export const sortTasks = (items: readonly TaskCard[], sort: TaskSort, order: SortOrder): TaskCard[] => {
  if (sort === 'default') {
    return [...items]
  }

  const next = [...items]
  const direction = order === 'asc' ? 1 : -1

  next.sort((left, right) => {
    if (sort === 'date') {
      return left.addedAt.localeCompare(right.addedAt) * direction
    }

    if (sort === 'popularity') {
      return (left.popularity - right.popularity) * direction
    }

    return (left.difficulty - right.difficulty) * direction
  })

  return next
}
