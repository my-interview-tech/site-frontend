/**
 * Шкала кеглей. Ключ — шаг шкалы, значение — кегль и интерлиньяж в px.
 * Шаги идут с зазором: новый размер встаёт на свободный номер вроде `150`, существующие ключи не меняются.
 */
export const typography = {
  100: { size: 10, lineHeight: 14 },
  200: { size: 12, lineHeight: 16 },
  300: { size: 13, lineHeight: 18 },
  400: { size: 14, lineHeight: 22 },
  500: { size: 16, lineHeight: 24 },
  600: { size: 18, lineHeight: 28 },
  700: { size: 20, lineHeight: 26 },
  800: { size: 28, lineHeight: 34 },
  900: { size: 32, lineHeight: 38 },
  1000: { size: 52, lineHeight: 58 },
} as const

/** Начертания Inter, которые подключает `Fonts`. */
export const fontWeights = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

/** Трекинг: `tight` и `tighter` для крупных заголовков, `wide` для подписей капсом. */
export const letterSpacings = {
  tighter: '-0.06em',
  tight: '-0.02em',
  wide: '0.04em',
} as const

export type TypographyStep = keyof typeof typography

export type FontWeight = keyof typeof fontWeights

export type Tracking = keyof typeof letterSpacings
