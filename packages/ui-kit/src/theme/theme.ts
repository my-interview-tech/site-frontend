import { breakpoints } from './breakpoints'
import { colorsDark } from './constantsColorsDark'
import { colorsLight } from './constantsColorsLight'
import type { Colors } from './constantsColorsLight'
import { container } from './container'
import { radii } from './radii'
import { shadowsDark, shadowsLight } from './shadows'
import type { Shadows } from './shadows'
import { spacings } from './spacings'
import { fontWeights, letterSpacings, typography } from './typography'

export type ThemeMode = 'dark' | 'light'

const toKebab = (key: string): string => key.replace(/[A-Z]/g, (letter) => `-${letter.toLowerCase()}`)

const toVarName = (prefix: string, key: string): string => `--${prefix}-${toKebab(key)}`

const toVars = <T extends Record<string, string>>(prefix: string, values: T): { [Key in keyof T]: string } =>
  Object.fromEntries(Object.keys(values).map((key) => [key, `var(${toVarName(prefix, key)})`])) as {
    [Key in keyof T]: string
  }

const toDeclarations = (prefix: string, values: Record<string, string>): string =>
  Object.entries(values)
    .map(([key, value]) => `${toVarName(prefix, key)}: ${value};`)
    .join('\n')

/**
 * Токены дизайна. Импортируется напрямую в стили и компоненты.
 * Цвета и тени — ссылки `var(--…)`, их значения для текущего режима выводит `GlobalStyles`.
 */
export const theme = {
  breakpoints,
  colors: toVars('color', colorsLight),
  container,
  fontWeights,
  letterSpacings,
  radii,
  shadows: toVars('shadow', shadowsLight),
  spacings,
  typography,
}

export type Theme = typeof theme

/** Объявления CSS-переменных цветов и теней для режима. */
export const getThemeVars = (mode: ThemeMode): string => {
  const colors: Colors = mode === 'dark' ? colorsDark : colorsLight
  const shadows: Shadows = mode === 'dark' ? shadowsDark : shadowsLight

  return `${toDeclarations('color', colors)}\n${toDeclarations('shadow', shadows)}`
}
