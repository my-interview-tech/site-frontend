import { useMatchMedia } from '../useMatchMedia'

/**
 * Пользователь просит меньше движения: `prefers-reduced-motion: reduce`.
 */
export const useReducedMotion = (): boolean => useMatchMedia('(prefers-reduced-motion: reduce)')
