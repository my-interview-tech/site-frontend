import styled from 'styled-components'

import { Button, Flex, theme } from '@my-interview/ui-kit'

const Island = styled(Flex)`
  background: ${theme.colors.page};
  border-radius: ${theme.radii.rPill}px;
  position: relative;
  width: fit-content;
`

const Thumb = styled.span<{ $height: number; $width: number; $x: number; $y: number }>`
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.rPill}px;
  height: ${({ $height }) => $height}px;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transform: ${({ $x, $y }) => `translate(${$x}px, ${$y}px)`};
  transition:
    height 220ms ease,
    transform 220ms ease,
    width 220ms ease;
  width: ${({ $width }) => $width}px;
  z-index: 0;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Segment = styled(Button)<{ $active: boolean }>`
  &&,
  &&:hover {
    background: transparent;
    color: ${({ $active }) => ($active ? theme.colors.white : theme.colors.textSecondary)};
    padding: ${theme.spacings.s6}px ${theme.spacings.s14}px;
    position: relative;
    z-index: 1;
  }
`

export const Styled = {
  Island,
  Segment,
  Thumb,
}
