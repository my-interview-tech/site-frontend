import styled from 'styled-components'

import { belowTablet, Flex } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  background: ${({ theme }) => theme.colors.canvas};
`

const Wrapper = styled(Flex)`
  max-width: 320px;
`

const Legal = styled(Flex)`
  text-align: right;

  ${({ theme }) => belowTablet(theme)} {
    text-align: left;
  }
`

export const Styled = {
  Container,
  Wrapper,
  Legal,
}
