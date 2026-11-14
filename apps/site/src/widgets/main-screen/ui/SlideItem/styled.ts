import styled from 'styled-components'

import { Flex, Image as UiImage, theme } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  z-index: 1;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    max-width: 420px;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    max-width: 560px;
  }
`

const Image = styled(UiImage)`
  flex: 1 1 auto;
  margin-left: 0;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    margin-left: auto;
  }
`

export const Styled = {
  Container,
  Image,
}
