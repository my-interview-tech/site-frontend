import { css } from 'styled-components'

import { fontWeights, letterSpacings, typography } from './typography'
import type { FontWeight, Tracking, TypographyStep } from './typography'

export interface TextStyleOptions {
  /**
   * Трекинг. Без значения — 0.
   */
  tracking?: Tracking

  /**
   * Капс.
   */
  uppercase?: boolean

  /**
   * Начертание. Без значения — `regular`.
   */
  weight?: FontWeight
}

/** CSS шага шкалы: кегль, интерлиньяж, начертание, трекинг и капс. */
export const textStyle = (
  step: TypographyStep,
  { tracking, uppercase = false, weight = 'regular' }: TextStyleOptions = {}
): ReturnType<typeof css> => css`
  font-size: ${typography[step].size}px;
  font-weight: ${fontWeights[weight]};
  letter-spacing: ${tracking ? letterSpacings[tracking] : 0};
  line-height: ${typography[step].lineHeight}px;
  ${uppercase ? 'text-transform: uppercase;' : null}
`
