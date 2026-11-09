import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'

const Root = styled.span`
  display: inline-flex;
  flex-shrink: 0;
  position: relative;
`

const Counter = styled.span`
  ${textStyle(100, { weight: 'bold' })}
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.rPill}px;
  color: ${theme.colors.white};
  min-width: 16px;
  padding: 0 ${theme.spacings.s4}px;
  pointer-events: none;
  position: absolute;
  right: -2px;
  text-align: center;
  top: -2px;
  z-index: 1;
`

export const Styled = {
  Counter,
  Root,
}
