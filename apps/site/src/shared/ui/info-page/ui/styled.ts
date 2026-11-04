import styled from 'styled-components'

import { belowTablet, Flex, Grid, tabletOnly } from '@my-interview/ui-kit'

const Container = styled.article`
  background: ${({ theme }) => theme.colors.canvas};
  padding: ${({ theme }) => theme.spacings.s64 + theme.spacings.s32}px ${({ theme }) => theme.layout.pageGutter}px
    ${({ theme }) => theme.spacings.s32}px;

  ${({ theme }) => tabletOnly(theme)} {
    padding-left: ${({ theme: next }) => next.layout.pageGutterTablet}px;
    padding-right: ${({ theme: next }) => next.layout.pageGutterTablet}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    padding: ${({ theme: next }) => next.spacings.s64 + next.spacings.s32}px
      ${({ theme: next }) => next.layout.pageGutterMobile}px ${({ theme: next }) => next.spacings.s32}px;
  }
`

const Board = styled(Grid)`
  margin-top: ${({ theme }) => theme.spacings.s72}px;
  margin-right: 0;
  margin-left: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    margin-top: ${({ theme }) => theme.spacings.s72}px;
    margin-right: 0;
    margin-left: 0;
  }
`

const Card = styled(Flex)`
  background: ${({ theme }) => theme.colors.page};
  border-radius: ${({ theme }) => theme.radii.r16}px;
`

const DescriptionWrapper = styled.div`
  margin-top: ${({ theme }) => theme.spacings.s16}px;
  max-width: 920px;

  p {
    white-space: pre-line;
  }
`

export const Styled = {
  Board,
  Card,
  Container,
  DescriptionWrapper,
}
