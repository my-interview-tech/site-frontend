import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Action = styled.span`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: inline-flex;
  }
`

const Badges = styled(Flex)`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

const Section = styled(Card)`
  overflow: hidden;
`

export const Styled = {
  Action,
  Badges,
  Section,
}
