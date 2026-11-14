import type { ElementType } from 'react'

import { Styled } from './Text.styled'
import type { TextProps } from './Text.types'

/**
 * Текст одного шага шкалы.
 * Стили без брейкпоинта действуют с 0px, пока их не перекроет `tablet`, `desktopXS` и шире.
 */
export const Text = <T extends ElementType = 'span'>({
  as,
  children,
  color,
  desktopL,
  desktopM,
  desktopS,
  desktopXL,
  desktopXS,
  font,
  tablet,
  textAlign,
  tracking,
  uppercase,
  weight,
  ...rest
}: TextProps<T>) => (
  <Styled.Component
    as={as ?? 'span'}
    $layout={{
      color,
      desktopL,
      desktopM,
      desktopS,
      desktopXL,
      desktopXS,
      font,
      tablet,
      textAlign,
      tracking,
      uppercase,
      weight,
    }}
    {...rest}
  >
    {children}
  </Styled.Component>
)
