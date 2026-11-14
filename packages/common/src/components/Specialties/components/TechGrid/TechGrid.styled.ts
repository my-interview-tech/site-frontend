import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

import { CARD_HEIGHT } from '../../Specialties.constants'

const Grid = styled.div`
  align-content: start;
  animation: specialties-in 220ms ease;
  display: grid;
  flex: 1;
  gap: ${theme.spacings.s12}px;
  grid-auto-rows: ${CARD_HEIGHT}px;
  grid-template-columns: minmax(0, 1fr);
  min-height: ${8 * CARD_HEIGHT + 7 * theme.spacings.s12}px;

  @keyframes specialties-in {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }

  @media (min-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

export const Styled = {
  Grid,
}
