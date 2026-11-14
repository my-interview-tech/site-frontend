import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'

import { CODE_FONT } from './Code.constants'

const Inline = styled.code`
  background: ${theme.colors.codeBg};
  border-radius: ${theme.radii.r2}px;
  color: ${theme.colors.textPrimary};
  font-family: ${CODE_FONT};

  /* Относительно текста вокруг, чтобы фрагмент не выпадал из строки. */
  font-size: 0.92em;
  padding: ${theme.spacings.s2}px ${theme.spacings.s4}px;
`

const Block = styled.pre`
  ${textStyle(300)}
  background: ${theme.colors.codeBg};
  border: 1px solid ${theme.colors.codeBorder};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textPrimary};
  font-family: ${CODE_FONT};
  margin: 0;
  overflow-x: auto;
  padding: ${theme.spacings.s14}px ${theme.spacings.s16}px;
  white-space: pre;
`

export const Styled = {
  Block,
  Inline,
}
