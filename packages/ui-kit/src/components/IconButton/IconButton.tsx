import type { ElementType } from 'react'

import { placeLens } from '../../theme/lens'

import { ICON_SIZE } from './IconButton.constants'
import { Styled } from './IconButton.styled'
import type { IconButtonProps } from './IconButton.types'

/**
 * Круглая кнопка с иконкой.
 */
export const IconButton = <T extends ElementType = 'button'>({
  as,
  iconDirection,
  iconSrc,
  isOpen,
  label,
  size = 40,
  variant = 'secondary',
  ...rest
}: IconButtonProps<T>) => (
  <Styled.Root
    {...rest}
    $size={size}
    $variant={variant}
    aria-expanded={isOpen}
    aria-label={label}
    forwardedAs={as}
    onPointerMove={variant === 'glass' || variant === 'ghost' ? placeLens : undefined}
  >
    <Styled.Glyph direction={iconDirection} iconSrc={iconSrc} size={ICON_SIZE[size]} />
  </Styled.Root>
)
