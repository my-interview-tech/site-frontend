import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

import { sectionOverlapPx, sectionPinPx } from '@shared/constants'

import type { HomeSectionSurface } from '../types'

const Root = styled(Flex)<{ $fillViewport: boolean; $surface: HomeSectionSurface }>`
  background: ${({ $surface }) => ($surface === 'canvas' ? theme.colors.canvas : theme.colors.surface)};
  border-radius: ${theme.radii.r32}px ${theme.radii.r32}px 0 0;
  box-shadow: ${theme.shadows.up};
  margin-top: -${theme.spacings.s32}px;
  min-height: ${({ $fillViewport }) =>
    $fillViewport ? `calc(100vh - ${sectionPinPx}px + ${sectionOverlapPx}px + 40px)` : 'auto'};

  @media (max-width: ${theme.breakpoints.tablet}px) {
    min-height: auto;
  }
`

export const Styled = {
  Root,
}
