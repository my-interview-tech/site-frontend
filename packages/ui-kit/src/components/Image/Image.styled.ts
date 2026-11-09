/* eslint-disable @typescript-eslint/no-unsafe-argument */
import styled, { css } from 'styled-components'

import { toPx } from '../../lib/resolveWidth'
import { breakpointsCss } from '../../lib/withBreakpoints'
import type { ImageLayout, ImageStyle } from './Image.types'

const rule = (property: string, value?: number | string) => (value === undefined ? '' : `${property}: ${toPx(value)};`)

const layoutCss = ({
  aspectRatio,
  fit,
  height,
  maxHeight,
  maxWidth,
  minWidth,
  objectPosition,
  radius,
  width,
}: ImageStyle) => css`
  ${rule('aspect-ratio', aspectRatio)}
  ${rule('border-radius', radius)}
  ${rule('height', height)}
  ${rule('max-height', maxHeight)}
  ${rule('max-width', maxWidth)}
  ${rule('min-width', minWidth)}
  ${rule('object-fit', fit)}
  ${rule('object-position', objectPosition)}
  ${rule('width', width)}
`

const Component = styled.img<{ $layout: ImageLayout }>`
  display: block;
  flex-shrink: 0;
  object-fit: contain;

  ${({ $layout }) => css`
    ${layoutCss($layout)}
    ${breakpointsCss($layout, layoutCss)}
  `}
`

const Picture = styled.picture`
  display: contents;
`

export const Styled = {
  Component,
  Picture,
}
