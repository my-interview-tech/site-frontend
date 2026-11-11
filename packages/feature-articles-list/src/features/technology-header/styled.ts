import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Action = styled.span`
  display: inline-flex;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

const Badges = styled(Flex)`
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: flex;
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
