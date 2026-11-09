import type { ComponentPropsWithoutRef, CSSProperties, ElementType } from 'react'

import type { WithBreakpoints } from '../../lib/withBreakpoints'
import type { FontWeight, Tracking, TypographyStep } from '../../theme/typography'

export interface TextStyle {
  /**
   * Цвет. Без значения наследует родителя.
   */
  color?: string

  /**
   * Шаг шкалы кеглей. Без значения кегль наследует родитель.
   */
  font?: TypographyStep

  /**
   * Выравнивание.
   */
  textAlign?: CSSProperties['textAlign']

  /**
   * Трекинг. На брейкпоинте без значения берётся базовый.
   */
  tracking?: Tracking

  /**
   * Капс. На брейкпоинте без значения берётся базовый.
   */
  uppercase?: boolean

  /**
   * Начертание. С `font` без значения — `regular`, на брейкпоинте без значения берётся базовое.
   */
  weight?: FontWeight
}

export type TextLayout = WithBreakpoints<TextStyle>

export type TextProps<T extends ElementType = 'span'> = TextLayout & {
  /** Тег вместо `span`, например `p`, `h2` или `a`. */
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof TextLayout | 'as'>
