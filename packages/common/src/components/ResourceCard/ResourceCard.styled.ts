import styled from 'styled-components'

import { Link, theme } from '@my-interview/ui-kit'

import { CARD_HEIGHT } from './ResourceCard.constants'

const Card = styled(Link)<{ $image: string }>`
  background-color: ${theme.colors.surface};
  background-image: ${({ $image }) => `url(${$image})`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  border: 1px solid ${theme.colors.borderCard};
  border-radius: ${theme.radii.r16}px;
  display: block;
  height: ${CARD_HEIGHT}px;
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    border-color: ${theme.colors.borderStrong};
    box-shadow: ${theme.shadows.sm};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`

export const Styled = {
  Card,
}
