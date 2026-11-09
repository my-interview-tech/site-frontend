export const DEFAULT_INTERVAL_MS = 5000

export const TRANSITION_MS = 400

export const ARROW_SIZE = 32

export const DOT_SIZE = 8

export const TEXT = {
  NEXT: 'Вперёд',
  PREVIOUS: 'Назад',
} as const

export const getDefaultDotLabel = (index: number): string => `Слайд ${index + 1}`
