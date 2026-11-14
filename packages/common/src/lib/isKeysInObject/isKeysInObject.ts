/**
 * Объект не `null` и содержит каждый ключ из списка.
 * Типы значений и вложенные пути не проверяются.
 */
export const isKeysInObject = <T = unknown>(obj: T, requiredKeys: readonly string[]): boolean => {
  if (typeof obj !== 'object' || obj === null) {
    return false
  }

  return requiredKeys.every((key) => key in obj)
}
