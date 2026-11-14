import styled, { keyframes } from 'styled-components'
import { BaseEdge, Handle } from '@xyflow/react'

import { Flex, Text, theme } from '@my-interview/ui-kit'

import { FLOW_WIDTH } from '@roadmap/shared/lib'

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

const Pin = styled(Flex)`
  scroll-margin-top: ${theme.spacings.s96 + theme.spacings.s64}px;
`

const Label = styled(Text)<{ $isDimmed: boolean }>`
  background: ${theme.colors.page};
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
  padding: ${theme.spacings.s4}px ${theme.spacings.s8}px;
  position: relative;
  z-index: 1;
`

const Note = styled(Flex)<{ $isDimmed: boolean }>`
  background: ${theme.colors.accentBg};
  border-radius: ${theme.radii.r16}px;
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
  text-align: center;
  z-index: 1;
`

const Bundle = styled.div`
  border: 1px dashed ${theme.colors.border};
  border-radius: ${theme.radii.r16}px;
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  z-index: 1;
`

const Anchor = styled(Handle)`
  && {
    border: 0;
    height: 1px;
    min-height: 0;
    min-width: 0;
    opacity: 0;
    pointer-events: none;
    width: 1px;
  }
`

const Line = styled(BaseEdge)`
  && {
    fill: none;
    stroke: ${theme.colors.ink};
    stroke-dasharray: 4 9;
    stroke-linecap: round;
    stroke-width: 2;
  }
`

export const Styled = {
  Anchor,
  Bundle,
  Flow,
  Label,
  Line,
  Note,
  Pin,
}
