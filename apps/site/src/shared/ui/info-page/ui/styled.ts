import styled from 'styled-components'

import { Flex, Grid, theme } from '@my-interview/ui-kit'

const Container = styled.article`
  background: ${theme.colors.canvas};
  padding: ${theme.spacings.s64 + theme.spacings.s32}px ${theme.container.padding}px ${theme.spacings.s32}px;

  @media (min-width: ${theme.breakpoints.tablet + 1}px) and (max-width: ${theme.breakpoints.desktopS - 1}px) {
    padding-left: ${theme.container.paddingTablet}px;
    padding-right: ${theme.container.paddingTablet}px;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    padding: ${theme.spacings.s64 + theme.spacings.s32}px ${theme.container.paddingMobile}px ${theme.spacings.s32}px;
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
