import type { SpinnerSize } from './Spinner.types'

/**
 * Толщина кольца в px для каждой стороны.
 */
export const STROKE = {
  12: 1.5,
  16: 2,
  20: 2,
} as const satisfies Record<SpinnerSize, number>

/**
 * Один оборот. При `prefers-reduced-motion` втрое медленнее.
 */
export const DURATION_MS = 800
