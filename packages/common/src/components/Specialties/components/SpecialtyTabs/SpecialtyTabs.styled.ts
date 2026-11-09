import styled from 'styled-components'

import { Button, Flex, Text, theme } from '@my-interview/ui-kit'

const Menu = styled(Flex)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r16}px;
  width: 280px;

  @media (min-width: ${theme.breakpoints.tablet + 1}px) and (max-width: ${theme.breakpoints.desktopS - 1}px) {
    width: 220px;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    background: transparent;
    border: 0;
    width: auto;

    && {
      flex-direction: row;
      gap: ${theme.spacings.s8}px;
    }
  }
`

const Item = styled(Button)<{ $isActive: boolean }>`
  && {
    background: ${({ $isActive }) => ($isActive ? theme.colors.accentBg : 'transparent')};
    border-radius: ${theme.radii.r10}px;
    color: ${({ $isActive }) => ($isActive ? theme.colors.accent : theme.colors.textSecondary)};
    justify-content: space-between;
    padding: ${theme.spacings.s12}px ${theme.spacings.s14}px;
    text-align: left;
  }

  @media (max-width: ${theme.breakpoints.tablet}px) {
    && {
      flex: 1;
      height: ${theme.spacings.s48}px;
      justify-content: center;
      padding: 0;
      width: auto;
    }
  }

  @media (hover: hover) and (min-width: ${theme.breakpoints.tablet + 1}px) {
    &&:hover {
      background: ${({ $isActive }) => ($isActive ? theme.colors.accentBg : theme.colors.page)};
    }
  }
`

const Title = styled(Text)`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

const Count = styled(Text)`
  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

export const Styled = {
  Count,
  Item,
  Menu,
  Title,
}
