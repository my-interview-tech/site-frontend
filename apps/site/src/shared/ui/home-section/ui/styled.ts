import styled from 'styled-components'

import { belowTablet, Flex } from '@my-interview/ui-kit'

import { sectionOverlapPx, sectionPinPx } from '@shared/constants'

import type { HomeSectionSurface } from '../types'

const Root = styled(Flex)<{ $fillViewport: boolean; $surface: HomeSectionSurface }>`
  background: ${({ $surface, theme }) => ($surface === 'canvas' ? theme.colors.canvas : theme.colors.surface)};
  border-radius: ${({ theme }) => theme.radii.r32}px ${({ theme }) => theme.radii.r32}px 0 0;
  box-shadow: ${({ theme }) => theme.shadows.section};
  margin-top: -${({ theme }) => theme.layout.sectionOverlap}px;
  min-height: ${({ $fillViewport }) =>
    $fillViewport ? `calc(100vh - ${sectionPinPx}px + ${sectionOverlapPx}px + 40px)` : 'auto'};

  ${({ theme }) => belowTablet(theme)} {
    min-height: auto;
  }
`

export const Styled = {
  Root,
}
