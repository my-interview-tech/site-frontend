import styled, { css } from 'styled-components'

import { breakpointKeys, breakpointsCss } from '../../lib/withBreakpoints'
import { textStyle } from '../../theme/textStyle'
import { fontWeights, letterSpacings } from '../../theme/typography'
import type { TextLayout, TextStyle } from './Text.types'

const fontCss = ({ font, tracking, uppercase, weight }: TextStyle) => {
  if (font) {
    return textStyle(font, { tracking, uppercase, weight })
  }

  return css`
    ${weight ? `font-weight: ${fontWeights[weight]};` : null}
    ${tracking ? `letter-spacing: ${letterSpacings[tracking]};` : null}
    ${uppercase ? 'text-transform: uppercase;' : null}
  `
}

const styleCss = (style: TextStyle) => css`
  ${fontCss(style)}
  ${style.color ? `color: ${style.color};` : null}
  ${style.textAlign ? `text-align: ${style.textAlign};` : null}
`

const forwarded = new Set([
  '$layout',
  'color',
  'font',
  'textAlign',
  'tracking',
  'uppercase',
  'weight',
  ...breakpointKeys,
])

const Component = styled.span.withConfig({
  shouldForwardProp: (prop) => !forwarded.has(prop),
})<{ $layout: TextLayout }>`
  ${({ $layout }) => css`
    ${styleCss($layout)}
    ${breakpointsCss($layout, (override) => {
      const inherited = override.font
        ? { tracking: $layout.tracking, uppercase: $layout.uppercase, weight: $layout.weight }
        : {}

      return styleCss({ ...inherited, ...override })
    })}
  `}
`

export const Styled = {
  Component,
}
