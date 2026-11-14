/**
 * Конечное число, без `NaN` и `Infinity`.
 */
export const isNumber = (value: unknown): value is number => typeof value === 'number' && Number.isFinite(value)

/**
 * Конечное число или строка: значения, которые можно отдать в CSS как есть.
 */
export const isNumberOrString = (value: unknown): value is number | string =>
  isNumber(value) || typeof value === 'string'
