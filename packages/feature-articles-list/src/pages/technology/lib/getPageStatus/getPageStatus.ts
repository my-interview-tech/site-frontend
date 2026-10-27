import { EPageStatus, isKeysInObject } from '@my-interview/common'

export const REQUIRED_KEYS = [
  'accordion',
  'recommendations',
  'resources',
  'sections',
  'slug',
  'title',
  'toc',
  'tocLabel',
] as const

/**
 * Статус экрана по загрузке, ошибке запроса и наличию ключей корня страницы.
 */
export const getPageStatus = <T = unknown>(
  isLoading: boolean,
  hasError: boolean,
  data: T,
  requiredFields: readonly string[]
): (typeof EPageStatus)[keyof typeof EPageStatus] => {
  if (isLoading) {
    return EPageStatus.LOADING
  }

  if (hasError || !isKeysInObject(data, requiredFields)) {
    return EPageStatus.ERROR
  }

  return EPageStatus.SUCCESS
}
