import type { SelectOption } from './Select.types'

/**
 * Подпись закрытого поля: первый выбранный пункт и счётчик остальных.
 */
export const getSummary = (options: readonly SelectOption[], value: readonly string[], placeholder: string): string => {
  const selected = options.filter((option) => value.includes(option.id))
  const [first] = selected

  if (!first) {
    return placeholder
  }

  if (selected.length === 1) {
    return first.label
  }

  return `${first.label} +${selected.length - 1}`
}

/**
 * Новый выбор после клика по пункту. Одиночный выбор снимается повторным кликом.
 */
export const getNextValue = (value: readonly string[], id: string, isMultiple: boolean): string[] => {
  const isSelected = value.includes(id)

  if (!isMultiple) {
    return isSelected ? [] : [id]
  }

  return isSelected ? value.filter((item) => item !== id) : [...value, id]
}
