import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  background: ${theme.colors.canvas};
`

const Wrapper = styled(Flex)`
  max-width: 320px;
`

const Legal = styled(Flex)`
  text-align: left;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    text-align: right;
  }
`

export const Styled = {
  Container,
  Wrapper,
  Legal,
}
