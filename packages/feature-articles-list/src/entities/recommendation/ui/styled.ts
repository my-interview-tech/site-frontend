import styled, { css } from 'styled-components'

import { Card as UiCard } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

const Card = styled(UiCard)<{ $inDrawer: boolean }>`
  ${({ $inDrawer }) =>
    !$inDrawer &&
    css`
      display: none;

      @media (min-width: ${theme.breakpoints.tablet}px) {
        display: flex;
      }
    `}
`

export const Styled = {
  Card,
}
