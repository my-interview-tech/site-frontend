import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

const FilterLabel = styled.span`
  display: inline-flex;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

const FilterIcon = styled.span`
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: inline-flex;
  }

  @media (min-width: ${theme.breakpoints.desktopXS}px) {
    display: none;
  }
`

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

const Empty = styled(Card)`
  grid-column: 1 / -1;
  text-align: center;
`

export const Styled = {
  Empty,
  FilterIcon,
  FilterLabel,
  Layout,
  List,
  Side,
}
