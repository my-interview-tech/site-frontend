import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Root = styled(Flex)`
  list-style: none;
  margin: 0;
`

const Step = styled(Flex)`
  scroll-margin-top: ${theme.spacings.s96 + theme.spacings.s64}px;
`

const Branch = styled(Flex)`
  border-left: 2px dashed ${theme.colors.roadmapLine};
  list-style: none;
  margin: 0;
`

const Heading = styled(Flex)<{ $isDimmed: boolean }>`
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
`

const Note = styled(Card)<{ $isDimmed: boolean }>`
  background: ${theme.colors.accentBg};
  border-color: transparent;
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
`

export const Styled = {
  Branch,
  Heading,
  Note,
  Root,
  Step,
}
