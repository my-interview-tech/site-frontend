import styled, { css } from 'styled-components'

import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'
import { MAX_WIDTH, TRANSITION_MS } from './Modal.constants'

const transition = (property: string) => css`
  transition: ${property} ${TRANSITION_MS}ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Root = styled(Flex)`
  inset: 0;
  position: fixed;
  z-index: 70;
`

const Scrim = styled(ButtonBase)<{ $isVisible: boolean }>`
  background: ${theme.colors.scrim};
  cursor: default;
  inset: 0;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  position: absolute;
  ${transition('opacity')}
`

const Panel = styled(Flex)<{ $isVisible: boolean }>`
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.r16}px;
  box-shadow: ${theme.shadows.overlay};
  max-height: 80vh;
  max-width: ${MAX_WIDTH}px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  outline: none;
  overflow: auto;
  position: relative;
  transform: scale(${({ $isVisible }) => ($isVisible ? 1 : 0.96)});
  width: 100%;
  ${transition('opacity, transform')}
`

export const Styled = {
  Panel,
  Root,
  Scrim,
}
