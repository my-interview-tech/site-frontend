import type { CSSProperties } from 'react'
import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

const Grid = styled.div<{ $align?: CSSProperties['alignItems']; $gap: number; $sidebar: number }>`
  align-items: ${({ $align }) => $align ?? 'stretch'};
  display: grid;
  gap: ${({ $gap }) => $gap}px;
  grid-template-columns: minmax(0, 1fr) ${({ $sidebar }) => $sidebar}px;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Styled = {
  Grid,
}
