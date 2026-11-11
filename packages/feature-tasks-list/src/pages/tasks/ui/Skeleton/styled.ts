import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

const Layout = styled.div`
  display: grid;
  gap: ${theme.spacings.s40}px;

  @media (min-width: ${theme.breakpoints.desktopXS}px) {
    grid-template-columns: minmax(0, 1fr) 280px;
  }
`

const Side = styled.div`
  display: none;

  @media (min-width: ${theme.breakpoints.desktopXS}px) {
    display: block;
  }
`

const List = styled.div`
  align-content: start;
  display: grid;
  gap: ${theme.spacings.s16}px;
  grid-template-columns: 1fr;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    grid-template-columns: 1fr 1fr;
  }
`

const Sort = styled.div`
  display: none;
  flex-direction: column;
  gap: ${theme.spacings.s8}px;
  width: 220px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: flex;
  }
`

export const Styled = {
  Layout,
  List,
  Side,
  Sort,
}
