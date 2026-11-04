import styled, { css } from 'styled-components'

import { belowTablet, tabletOnly } from '@my-interview/ui-kit'

const motion = `
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const Sheet = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.r32}px;
  box-shadow: ${({ theme }) => theme.shadows.overlay};
  left: ${({ theme }) => theme.spacings.s24}px;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  overflow: hidden;
  padding-top: ${({ theme }) => theme.spacings.s64}px;
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  position: absolute;
  right: ${({ theme }) => theme.spacings.s24}px;
  top: 0;
  transition: opacity 220ms ease;
  z-index: 1;

  ${({ theme }) => belowTablet(theme)} {
    border-radius: 0 0 ${({ theme: next }) => next.radii.r32}px ${({ theme: next }) => next.radii.r32}px;
    box-shadow: ${({ theme: next }) => next.shadows.overlay};
    left: 0;
    right: 0;
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
  background: ${({ theme }) => theme.colors.page};
  height: ${({ theme }) => (theme.mode === 'dark' ? 0 : 1)}px;
`

const Columns = styled.nav`
  display: grid;
  gap: ${({ theme }) => theme.spacings.s32}px;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  padding: ${({ theme }) => theme.spacings.s12}px ${({ theme }) => theme.layout.pageGutter - theme.spacings.s24}px
    ${({ theme }) => theme.spacings.s40}px;

  ${({ theme }) => tabletOnly(theme)} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    padding: ${({ theme: next }) => next.spacings.s12}px
      ${({ theme: next }) => next.layout.pageGutterTablet - next.spacings.s24}px
      ${({ theme: next }) => next.spacings.s40}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    grid-template-columns: minmax(0, 1fr);
    padding: ${({ theme: next }) => next.spacings.s40}px ${({ theme: next }) => next.layout.pageGutterMobile}px
      ${({ theme: next }) => next.spacings.s80}px;
  }
`

const Column = styled.div<{ $end?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacings.s12}px;
  ${({ $end }) => ($end ? 'grid-column: 4; grid-row: 1;' : '')}

  ${({ $end, theme }) =>
    $end &&
    css`
      ${tabletOnly(theme)} {
        grid-column: 2;
        grid-row: 2;
      }

      ${belowTablet(theme)} {
        grid-column: auto;
        grid-row: auto;
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
