import styled from 'styled-components'

import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'

const Trigger = styled(ButtonBase)`
  border-radius: inherit;
  inset: 0;
  position: absolute;
  z-index: 1;

  &:focus-visible {
    outline-offset: -2px;
  }
`

const Slot = styled(Flex)`
  z-index: 2;
`

const Chevron = styled(Flex)`
  color: ${theme.colors.textSecondary};
  height: 36px;
  width: 36px;
`

const Panel = styled.div<{ $isOpen: boolean }>`
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? '1fr' : '0fr')};
  transition: grid-template-rows 200ms ease;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Clip = styled.div`
  min-height: 0;
  overflow: hidden;
`

const Body = styled(Flex)`
  border-top: 1px solid ${theme.colors.border};
  margin: 0 ${theme.spacings.s20}px;
`

export const Styled = {
  Body,
  Chevron,
  Clip,
  Panel,
  Slot,
  Trigger,
}
