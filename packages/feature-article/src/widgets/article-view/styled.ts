import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

const Layout = styled.div`
  display: grid;
  gap: ${theme.spacings.s20}px;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    align-items: start;
    grid-template-columns: minmax(0, 1fr) 240px;
  }
`

const Side = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    display: block;
  }
`

export const Styled = {
  Layout,
  Side,
}
