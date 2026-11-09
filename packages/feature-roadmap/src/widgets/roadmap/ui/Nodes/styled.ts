import styled from 'styled-components'
import { BaseEdge, Handle } from '@xyflow/react'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Pin = styled(Flex)`
  scroll-margin-top: ${theme.spacings.s96 + theme.spacings.s64}px;
`

const Label = styled.span<{ $isDimmed: boolean }>`
  ${textStyle(500, { weight: 'semibold' })}
  background: ${theme.colors.page};
  color: ${theme.colors.ink};
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
  padding: ${theme.spacings.s4}px ${theme.spacings.s8}px;
  position: relative;
  text-align: center;
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
  Label,
  Line,
  Note,
  Pin,
}
