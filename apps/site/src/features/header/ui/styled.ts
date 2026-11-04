import styled, { createGlobalStyle } from 'styled-components'

import { belowTablet, Flex } from '@my-interview/ui-kit'

const motion = `
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

const ScrollLock = createGlobalStyle`
  body {
    padding-right: var(--guest-scrollbar-gap, 0);
  }

  body[data-nav-menu='open'] [data-snap-section] {
    border-radius: 0;
  }
`

const Container = styled.header<{ $offset: number }>`
  left: 0;
  padding-right: var(--guest-scrollbar-gap, 0);
  position: fixed;
  right: 0;
  top: 0;
  transform: ${({ $offset }) => ($offset > 0 ? `translateY(${$offset}px)` : 'none')};
  z-index: 50;
`

const Bar = styled(Flex)<{ $contrast: boolean; $solid: boolean; $surface: 'canvas' | 'hero' | 'page' | 'white' }>`
  background: ${({ $contrast, $solid, $surface, theme }) => {
    if ($contrast) {
      return theme.colors.surface
    }

    if (!$solid || $surface === 'hero') {
      return 'transparent'
    }

    if ($surface === 'white') {
      return theme.colors.surface
    }

    if ($surface === 'canvas') {
      return theme.colors.canvas
    }

    return theme.colors.page
  }};
  box-shadow: ${({ $contrast, theme }) => ($contrast ? `inset 0 -1px 0 ${theme.colors.border}` : 'none')};
  box-sizing: border-box;
  height: ${({ theme }) => theme.spacings.s64}px;
  z-index: 2;

  ${({ theme }) => belowTablet(theme)} {
    > a {
      position: relative;

      span {
        clip-path: inset(50%);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
      }
    }
  }
`

const Scrim = styled.div<{ $open: boolean }>`
  background: ${({ theme }) => theme.colors.scrim};
  inset: 0;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  position: fixed;
  transition: opacity 220ms ease;
  z-index: 40;
  ${motion}
`

export const Styled = {
  Container,
  Bar,
  Scrim,
  ScrollLock,
}
