import styled from 'styled-components'

import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'
import { ARROW_SIZE, DOT_SIZE, TRANSITION_MS } from './Carousel.constants'

const Row = styled(Flex)`
  margin-top: ${theme.spacings.s12}px;
`

const Cards = styled(Flex)`
  min-width: 0;
  overflow: hidden;
`

const Track = styled(Flex)<{ $isAnimated: boolean; $index: number; $visible: number }>`
  transform: ${({ $index, $visible }) =>
    `translateX(calc(${$index} * -1 * ((100% + ${theme.spacings.s16}px) / ${$visible})))`};
  transition: transform ${({ $isAnimated }) => ($isAnimated ? TRANSITION_MS : 0)}ms ease;
`

const Slot = styled.div<{ $visible: number }>`
  flex: 0 0 100%;
  min-width: 0;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    flex-basis: calc(
      (100% - ${({ $visible }) => theme.spacings.s16 * ($visible - 1)}px) / ${({ $visible }) => $visible}
    );
  }
`

const Arrow = styled(ButtonBase)`
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textSecondary};
  display: none;
  flex-shrink: 0;
  height: ${ARROW_SIZE}px;
  width: ${ARROW_SIZE}px;

  @media (hover: hover) {
    &:hover {
      background: ${theme.colors.page};
    }
  }

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: inline-flex;
  }
`

const Dot = styled(ButtonBase)<{ $isActive: boolean }>`
  background: ${({ $isActive }) => ($isActive ? theme.colors.accent : theme.colors.borderStrong)};
  border-radius: ${theme.radii.rPill}px;
  height: ${DOT_SIZE}px;
  width: ${DOT_SIZE}px;
`

export const Styled = {
  Arrow,
  Cards,
  Dot,
  Row,
  Slot,
  Track,
}
