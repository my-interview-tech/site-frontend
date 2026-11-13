import styled from 'styled-components'

import { Button, theme } from '@my-interview/ui-kit'

import type { TocItemLevel } from './Toc.types'

const Container = styled.nav`
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: block;
  }
`

const Item = styled(Button)<{ $isDimmed: boolean; $level: TocItemLevel }>`
  border-radius: ${theme.radii.r10}px;
  justify-content: flex-start;
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  padding-left: ${({ $level }) => ($level === 2 ? theme.spacings.s24 : theme.spacings.s12)}px;
  text-align: left;
`

export const Styled = {
  Container,
  Item,
}
