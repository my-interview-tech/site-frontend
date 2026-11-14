import styled from 'styled-components'

import { Flex, Grid as PageGrid, theme } from '@my-interview/ui-kit'

const Grid = styled(PageGrid)`
  && {
    gap: ${theme.spacings.s16}px;
    grid-template-columns: minmax(0, 1fr);
    height: auto;
    min-height: 0;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    && {
      grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
      height: calc(100dvh - ${theme.spacings.s96 * 2}px);
      min-height: 560px;
    }
  }
`

const Pane = styled(Flex)<{ $hidden: boolean }>`
  display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  min-height: 0;
  min-width: 0;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    display: flex;
  }
`

const Tabs = styled(Flex)`
  @media (min-width: ${theme.breakpoints.desktopS}px) {
    display: none;
  }
`

export const Styled = {
  Grid,
  Pane,
  Tabs,
}
