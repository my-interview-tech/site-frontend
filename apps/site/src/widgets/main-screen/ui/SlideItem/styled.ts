import styled from 'styled-components'
import { belowTablet, Flex, tabletOnly } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  z-index: 1;

  @media (min-width: ${({ theme }) => theme.breakpoints.desktopS}px) {
    max-width: 560px;
  }

  ${({ theme }) => tabletOnly(theme)} {
    max-width: 420px;
  }
`

const Wrapper = styled.div`
  max-width: 424px;
`

const Image = styled.img`
  border-radius: ${({ theme }) => theme.radii.r20}px;
  flex: 1 1 auto;
  height: 100%;
  margin-left: auto;
  max-height: 100%;
  max-width: min(56vw, 1120px);
  min-width: 0;
  object-fit: contain;
  object-position: right center;
  width: auto;

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
    margin-left: 0;
    max-height: none;
    max-width: none;
    width: 100%;
  }
`

export const Styled = {
  Container,
  Image,
  Wrapper,
}
