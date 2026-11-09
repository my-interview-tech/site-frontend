import type { ElementType } from 'react'

import { theme } from '@my-interview/ui-kit'

import { splitAnchor } from './AnchorHeading.lib'
import { Styled } from './AnchorHeading.styled'
import type { AnchorHeadingProps } from './AnchorHeading.types'

/**
 * Заголовок с якорем.
 *
 * @description Хвост `{#id}` становится `id` и убирается из текста. Явный `id` важнее якоря.
 */
export const AnchorHeading = <T extends ElementType = 'h2'>({
  as,
  children,
  color = theme.colors.textPrimary,
  font = 700,
  id,
  weight = 'semibold',
  ...rest
}: AnchorHeadingProps<T>) => {
  const heading = splitAnchor(children)

  return (
    <Styled.Root {...rest} color={color} font={font} forwardedAs={as ?? 'h2'} id={id ?? heading.id} weight={weight}>
      {heading.children}
    </Styled.Root>
  )
}
