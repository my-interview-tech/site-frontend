import styled, { css } from 'styled-components'

import { belowTablet, Flex, textStyle } from '@my-interview/ui-kit'

const SideNav = styled(Flex)`
  padding-top: ${({ theme }) => theme.spacings.s8}px;

  ${({ theme }) => belowTablet(theme)} {
    padding-top: 0;
  }
`

const NavButton = styled.button<{ $isActive: boolean }>`
  ${({ $isActive, theme }) => textStyle($isActive ? theme.typography.bodyStrong : theme.typography.body)}
  background: transparent;
  border: 0;
  color: ${({ $isActive, theme }) => ($isActive ? theme.colors.accent : theme.colors.textPrimary)};
  cursor: pointer;
  padding: ${({ theme }) => theme.spacings.s8}px 0;
  text-align: left;

  ${({ $isActive, theme }) => css`
    ${belowTablet(theme)} {
      background: ${$isActive ? theme.colors.accentBg : theme.colors.surface};
      border: 1px solid ${$isActive ? theme.colors.accentBorder : theme.colors.border};
      border-radius: ${theme.radii.rPill}px;
      padding: ${theme.spacings.s8}px ${theme.spacings.s16}px;
    }
  `}
`

export const Styled = {
  NavButton,
  SideNav,
}
