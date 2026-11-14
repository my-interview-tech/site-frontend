import styled, { css } from 'styled-components'

import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'
import { TRANSITION_MS } from './BottomSheet.constants'

const transition = (property: string) => css`
  transition: ${property} ${TRANSITION_MS}ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Root = styled.div`
  inset: 0;
  position: fixed;
  z-index: 70;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    display: none;
  }
`

const Scrim = styled(ButtonBase)<{ $isVisible: boolean }>`
  background: ${theme.colors.scrim};
  inset: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  position: absolute;
  ${transition('opacity')}
`

const Panel = styled(Flex)<{ $isVisible: boolean }>`
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.r32}px ${theme.radii.r32}px 0 0;
  bottom: 0;
  left: 0;
  max-height: 80vh;
  outline: none;
  overflow: auto;
  position: absolute;
  right: 0;
  transform: translateY(${({ $isVisible }) => ($isVisible ? '0' : '100%')});
  ${transition('transform')}
`

export const Styled = {
  Panel,
  Root,
  Scrim,
}
