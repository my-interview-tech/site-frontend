import type { ElementType } from 'react'

import { placeLens } from '../../theme/lens'

import { Styled } from './Button.styled'
import type { ButtonProps } from './Button.types'

/**
 * Кнопка.
 *
 * @description
 * - Ссылка — `as={Link}` с `href`, внешняя ссылка — `as="a"`. Пропсы и события выводятся из `as`.
 */
export const Button = <T extends ElementType = 'button'>({
  as,
  children,
  desktopL,
  desktopM,
  desktopS,
  desktopXL,
  desktopXS,
  fullWidth = false,
  shape = 'rect',
  size = 40,
  tablet,
  variant = 'secondary',
  ...rest
}: ButtonProps<T>) => {
  const hasLens = variant === 'glass' || variant === 'ghost'

  return (
    <Styled.Root
      {...rest}
      $fullWidth={fullWidth}
      $layout={{ desktopL, desktopM, desktopS, desktopXL, desktopXS, size, tablet }}
      $shape={shape}
      $variant={variant}
      forwardedAs={as}
      onPointerMove={hasLens ? placeLens : undefined}
    >
      {hasLens ? <Styled.Label>{children}</Styled.Label> : children}
    </Styled.Root>
  )
}
