import styled, { css } from 'styled-components'

import { isNumberOrString } from '../../lib/isNumber'
import { resolveWidth, toPx } from '../../lib/resolveWidth'
import { breakpointsCss } from '../../lib/withBreakpoints'
import type { FlexLayout, FlexStyle } from './Flex.types'

const layoutCss = ({
  alignContent,
  alignItems,
  alignSelf,
  columnGap,
  fillHeight,
  fillWidth,
  flex,
  flexBasis,
  flexDirection,
  flexGrow,
  flexShrink,
  flexWrap,
  gap,
  inline,
  justifyContent,
  justifyItems,
  justifySelf,
  order,
  p,
  relatively,
  rowGap,
  width,
}: FlexStyle) => css`
  display: ${inline ? 'inline-flex' : 'flex'};
  position: ${relatively ? 'relative' : undefined};
  height: ${fillHeight ? '100%' : 'unset'};
  width: ${resolveWidth(fillWidth, width)};
  padding: ${toPx(p)};
  flex-direction: ${flexDirection};
  justify-content: ${justifyContent};
  justify-items: ${justifyItems};
  justify-self: ${justifySelf};
  align-content: ${alignContent};
  align-items: ${alignItems};
  align-self: ${alignSelf};
  flex-wrap: ${flexWrap};
  flex: ${isNumberOrString(flex) ? flex : undefined};
  flex-grow: ${isNumberOrString(flexGrow) ? flexGrow : undefined};
  flex-shrink: ${isNumberOrString(flexShrink) ? flexShrink : undefined};
  flex-basis: ${toPx(flexBasis)};
  order: ${isNumberOrString(order) ? order : undefined};
  gap: ${toPx(gap)};
  row-gap: ${toPx(rowGap)};
  column-gap: ${toPx(columnGap)};
`

const Component = styled.div<{ $layout: FlexLayout }>`
  ${({ $layout }) => css`
    ${layoutCss($layout)}
    ${breakpointsCss($layout, layoutCss)}
  `}
`

export const Styled = {
  Component,
}
