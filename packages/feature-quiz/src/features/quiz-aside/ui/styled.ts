import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Card = styled(Flex)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r16}px;
`

const Clock = styled.p`
  ${textStyle(900, { weight: 'semibold' })}
  color: ${theme.colors.textPrimary};
  margin: 0;
`

export const Styled = {
  Card,
  Clock,
}
