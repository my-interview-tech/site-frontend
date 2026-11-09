import styled, { keyframes } from 'styled-components'

import { FLOW_WIDTH } from '../../lib/flow'

const rise = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const Flow = styled.div<{ $height: number }>`
  --xy-background-color: transparent;

  animation: ${rise} 240ms ease;
  height: ${({ $height }) => $height}px;
  margin: 0 auto;
  width: ${FLOW_WIDTH}px;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Styled = {
  Flow,
}
