import styled from 'styled-components'

import { theme } from '../../theme/theme'
import { Flex } from '../Flex'

const SIZE = 32

const Mark = styled(Flex)<{ $background: string }>`
  background: ${({ $background }) => $background};
  border-radius: ${theme.radii.r8}px;
  font-variant-numeric: tabular-nums;
  height: ${SIZE}px;
  width: ${SIZE}px;
`

export const Styled = {
  Mark,
}
