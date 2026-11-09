import type { TaskSelection } from '../../types'

/**
 * Значение добавляется, если его нет, и убирается, если есть.
 */
export const toggle = <T>(values: readonly T[], value: T): T[] =>
  values.includes(value) ? values.filter((item) => item !== value) : [...values, value]

/**
 * Хотя бы одна группа сужает список.
 */
export const hasSelection = ({
  companies,
  difficulties,
  languages,
  order,
  query,
  sort,
  status,
  tags,
  premium,
}: TaskSelection): boolean =>
  companies.length > 0 ||
  difficulties.length > 0 ||
  languages.length > 0 ||
  tags.length > 0 ||
  query.trim() !== '' ||
  sort !== 'default' ||
  order !== 'asc' ||
  status !== 'all' ||
  premium
