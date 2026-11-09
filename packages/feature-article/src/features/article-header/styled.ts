import styled from 'styled-components'
import { Card } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

const Action = styled.span`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: inline-flex;
  }
`

const Section = styled(Card)`
  overflow: hidden;
`

export const Styled = {
  Action,
  Section,
}
