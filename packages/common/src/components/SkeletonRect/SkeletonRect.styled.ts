import styled, { keyframes } from 'styled-components'

import { theme } from '@my-interview/ui-kit'

import { PULSE_MS } from './SkeletonRect.constants'

const toCssSize = (value: number | string): string => (typeof value === 'number' ? `${value}px` : value)

const pulse = keyframes`
  50% {
    opacity: 0.4;
  }
`

const Skeleton = styled.span<{ $height: number | string; $radius?: number; $width?: number | string }>`
  animation: ${pulse} ${PULSE_MS}ms ease-in-out infinite;
  background: ${theme.colors.borderSoft};
  border-radius: ${({ $radius }) => $radius ?? theme.radii.r8}px;
  display: block;
  flex-shrink: 0;
  height: ${({ $height }) => toCssSize($height)};
  width: ${({ $width }) => ($width === undefined ? '100%' : toCssSize($width))};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Styled = {
  Skeleton,
}
