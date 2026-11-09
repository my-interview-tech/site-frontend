import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Frame = styled(Flex)`
  min-width: 0;
`

const List = styled.div`
  align-content: start;
  display: grid;
  gap: ${theme.spacings.s16}px;
  grid-template-columns: 1fr 1fr;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
  }
`

export const Styled = {
  Frame,
  List,
}
