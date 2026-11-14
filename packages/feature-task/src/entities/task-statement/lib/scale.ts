import { SCALE } from '../constants'

/**
 * Число закрашенных делений шкалы. Нечисловое значение — ноль.
 */
export const getFilledCount = (value: string): number => {
  const count = Number(value)

  if (!Number.isFinite(count)) {
    return 0
  }

  return Math.min(SCALE, Math.max(0, Math.trunc(count)))
}
