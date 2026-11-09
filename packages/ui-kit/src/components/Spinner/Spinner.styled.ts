import styled, { keyframes } from 'styled-components'

import { DURATION_MS, STROKE } from './Spinner.constants'
import type { SpinnerSize } from './Spinner.types'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Root = styled.span<{ $size: SpinnerSize }>`
  animation: ${spin} ${DURATION_MS}ms linear infinite;
  border: ${({ $size }) => STROKE[$size]}px solid currentcolor;
  border-radius: 50%;
  border-top-color: transparent;
  box-sizing: border-box;
  display: inline-block;
  flex-shrink: 0;
  height: ${({ $size }) => $size}px;
  width: ${({ $size }) => $size}px;

  @media (prefers-reduced-motion: reduce) {
    animation-duration: ${DURATION_MS * 3}ms;
  }
`

export const Styled = {
  Root,
}
