import type { ElementType } from 'react'

import { theme } from '../../theme/theme'

import { Styled } from './Chip.styled'
import type { ChipProps } from './Chip.types'

/**
 * Чип.
 *
 * @description
 * - `round` — капсула.
 * - `rect` — прямоугольная метка с рамкой акцента.
 */
export const Chip = <T extends ElementType = 'button'>({
  as,
  children,
  isSelected = false,
  size = 40,
  variant = 'round',
  ...rest
}: ChipProps<T>) => {
  if (variant === 'rect') {
    return (
      <Styled.Rect color={theme.colors.accent} font={300} weight="medium">
        {children}
      </Styled.Rect>
    )
  }

  return (
    <Styled.Round {...rest} $isSelected={isSelected} $size={size} aria-pressed={isSelected} forwardedAs={as}>
      {children}
    </Styled.Round>
  )
}
