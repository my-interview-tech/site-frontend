import styled, { css } from 'styled-components'

import { belowTablet, textStyle } from '@my-interview/ui-kit'

const Label = styled.div`
  padding: ${({ theme }) => theme.spacings.s2}px ${({ theme }) => theme.spacings.s12}px
    ${({ theme }) => theme.spacings.s8}px;

  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const TocButton = styled.button<{ $active: boolean }>`
  ${({ $active, theme }) => textStyle($active ? theme.typography.bodyStrong : theme.typography.body)}
  border: 0;
  border-radius: ${({ theme }) => theme.radii.r10}px;
  cursor: pointer;
  padding: ${({ theme }) => theme.spacings.s8}px ${({ theme }) => theme.spacings.s12}px;
  text-align: left;
  width: 100%;

  ${({ $active, theme }) => {
    const dark = theme.mode === 'dark'

    if (!$active) {
      return css`
        background: transparent;
        color: ${theme.colors.textSecondary};

        @media (hover: hover) and (min-width: 769px) {
          &:hover {
            background: ${theme.colors.page};
          }
        }
      `
    }

    return css`
      background: ${dark ? theme.colors.chip : theme.colors.accentBg};
      color: ${dark ? theme.colors.textPrimary : theme.colors.accent};
    `
  }}

  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

export const Styled = {
  Label,
  TocButton,
}
