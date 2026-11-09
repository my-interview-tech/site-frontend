import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const LevelValue = styled(Flex)`
  ${textStyle(200, { weight: 'semibold' })}
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.r8}px;
  color: ${theme.colors.white};
  height: 20px;
`

const Subscribe = styled(Flex)`
  background: ${theme.colors.accentBg};
  border-radius: ${theme.radii.r10}px;
`

export const Styled = {
  LevelValue,
  Subscribe,
}
