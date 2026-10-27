import { EPageStatus, isKeysInObject } from '@my-interview/common'

export const REQUIRED_KEYS = ['id', 'title', 'access', 'accordion', 'content', 'meta', 'toc', 'tocLabel'] as const

/**
 * Статус экрана по загрузке, ошибке запроса и наличию ключей корня.
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
