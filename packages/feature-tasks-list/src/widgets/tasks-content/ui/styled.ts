import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Column = styled(Flex)`
  min-width: 0;
`

const FilterAction = styled.span`
  display: none;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: inline-flex;
  }
`

const Side = styled.div`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

const List = styled.div`
  align-content: start;
  display: grid;
  gap: ${theme.spacings.s16}px;
  grid-template-columns: 1fr 1fr;
  min-width: 0;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: 1fr;
  }
`

const Empty = styled(Card)`
  grid-column: 1 / -1;
  text-align: center;
`

export const Styled = {
  Column,
  Empty,
  FilterAction,
  List,
  Side,
}
