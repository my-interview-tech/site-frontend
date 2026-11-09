import styled from 'styled-components'

import { Flex, Grid as PageGrid, theme } from '@my-interview/ui-kit'

const Grid = styled(PageGrid)`
  && {
    gap: ${theme.spacings.s16}px;
    grid-template-columns: minmax(0, 2fr) minmax(0, 3fr);
    height: calc(100dvh - ${theme.spacings.s96 * 2}px);
    min-height: 560px;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    && {
      grid-template-columns: minmax(0, 1fr);
      height: auto;
      min-height: 0;
    }
  }
`

const Pane = styled(Flex)<{ $hidden: boolean }>`
  min-height: 0;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: ${({ $hidden }) => ($hidden ? 'none' : 'flex')};
  }
`

const Tabs = styled(Flex)`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: flex;
  }
`

export const Styled = {
  Grid,
  Pane,
  Tabs,
}
