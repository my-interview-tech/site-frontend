import styled from 'styled-components'

import { Button, Flex, Text, theme } from '@my-interview/ui-kit'

const Menu = styled(Flex)`
  background: transparent;
  border: 0;
  border-radius: ${theme.radii.r16}px;
  width: auto;

  && {
    flex-direction: row;
    gap: ${theme.spacings.s8}px;
  }

  /* stylelint-disable-next-line order/order */
  @media (min-width: ${theme.breakpoints.tablet}px) {
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.border};
    width: 220px;

    && {
      flex-direction: column;
      gap: ${theme.spacings.s4}px;
    }
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    width: 280px;
  }
`

const Item = styled(Button)<{ $isActive: boolean }>`
  && {
    background: ${({ $isActive }) => ($isActive ? theme.colors.accentBg : 'transparent')};
    border-radius: ${theme.radii.r10}px;
    color: ${({ $isActive }) => ($isActive ? theme.colors.accent : theme.colors.textSecondary)};
    flex: 1;
    height: ${theme.spacings.s48}px;
    justify-content: center;
    padding: 0;
    text-align: left;
    width: auto;
  }

  /* stylelint-disable-next-line order/order */
  @media (min-width: ${theme.breakpoints.tablet}px) {
    && {
      flex: 0 1 auto;
      height: auto;
      justify-content: space-between;
      padding: ${theme.spacings.s12}px ${theme.spacings.s14}px;
      width: 100%;
    }
  }

  @media (hover: hover) and (min-width: ${theme.breakpoints.tablet}px) {
    &&:hover {
      background: ${({ $isActive }) => ($isActive ? theme.colors.accentBg : theme.colors.page)};
    }
  }
`

const Title = styled(Text)`
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: inline;
  }
`

const Count = styled(Text)`
  display: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: inline;
  }
`

export const Styled = {
  Count,
  Item,
  Menu,
  Title,
}
