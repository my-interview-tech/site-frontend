import styled from 'styled-components'

import { Flex, Grid, theme } from '@my-interview/ui-kit'

const Container = styled.article`
  background: ${theme.colors.canvas};
  padding: ${theme.spacings.s64 + theme.spacings.s32}px ${theme.container.paddingMobile}px ${theme.spacings.s32}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    padding-left: ${theme.container.paddingTablet}px;
    padding-right: ${theme.container.paddingTablet}px;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    padding-left: ${theme.container.padding}px;
    padding-right: ${theme.container.padding}px;
  }
`

const Board = styled(Grid)`
  margin-top: ${theme.spacings.s72}px;
`

const Card = styled(Flex)`
  background: ${theme.colors.page};
  border-radius: ${theme.radii.r16}px;
`

const DescriptionWrapper = styled.div`
  max-width: 920px;
  white-space: pre-line;
`

export const Styled = {
  Board,
  Card,
  Container,
  DescriptionWrapper,
}
