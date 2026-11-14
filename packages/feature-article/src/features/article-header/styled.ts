import styled from 'styled-components'
import { Card } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

const Action = styled.span`
  display: inline-flex;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    display: none;
  }
`

const Section = styled(Card)`
  overflow: hidden;
`

export const Styled = {
  Action,
  Section,
}
