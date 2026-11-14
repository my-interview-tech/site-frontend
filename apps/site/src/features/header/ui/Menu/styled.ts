import styled, { css } from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const motion = `
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Sheet = styled.div<{ $open: boolean }>`
  background: ${theme.colors.surface};
  border-radius: 0 0 ${theme.radii.r32}px ${theme.radii.r32}px;
  box-shadow: ${theme.shadows.overlay};
  left: 0;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  padding-top: ${theme.spacings.s64}px;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  transition: opacity 220ms ease;
  z-index: 1;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    border-radius: ${theme.radii.r32}px;
    left: ${theme.spacings.s24}px;
    right: ${theme.spacings.s24}px;
  }

  ${motion}
`

const Reveal = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 320ms ease;
  ${motion}
`

const RevealClip = styled.div<{ $open: boolean }>`
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  transition: opacity 180ms ease ${({ $open }) => ($open ? '90ms' : '0ms')};
  ${motion}
`

const Divider = styled.div`
  background: ${theme.colors.page};
  height: ${({ theme }) => (theme.mode === 'dark' ? 0 : 1)}px;
`

const Columns = styled.nav`
  display: grid;
  gap: ${theme.spacings.s32}px;
  grid-template-columns: minmax(0, 1fr);
  padding: ${theme.spacings.s40}px ${theme.container.paddingMobile}px ${theme.spacings.s80}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: ${theme.spacings.s12}px ${theme.container.paddingTablet - theme.spacings.s24}px ${theme.spacings.s40}px;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    grid-template-columns: repeat(4, minmax(0, 1fr));
    padding: ${theme.spacings.s12}px ${theme.container.padding - theme.spacings.s24}px ${theme.spacings.s40}px;
  }
`

const Column = styled(Flex)<{ $end?: boolean }>`
  ${({ $end }) =>
    $end &&
    css`
      grid-column: auto;
      grid-row: auto;

      @media (min-width: ${theme.breakpoints.tablet}px) {
        grid-column: 2;
        grid-row: 2;
      }

      @media (min-width: ${theme.breakpoints.desktopS}px) {
        grid-column: 4;
        grid-row: 1;
      }
    `}
`

export const Styled = {
  Column,
  Columns,
  Divider,
  Reveal,
  RevealClip,
  Sheet,
}
