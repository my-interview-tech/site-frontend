import styled from 'styled-components'

import { Flex } from '@my-interview/ui-kit'

const IconButton = styled.button<{ $onHero: boolean }>`
  align-items: center;
  background: transparent;
  border: 0;
  border-radius: 50%;
  color: ${({ $onHero, theme }) => ($onHero ? theme.colors.white : theme.colors.textPrimary)};
  cursor: pointer;
  display: inline-flex;
  height: ${({ theme }) => theme.spacings.s40}px;
  justify-content: center;
  padding: 0;
  width: ${({ theme }) => theme.spacings.s40}px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.accent};
    outline-offset: 2px;
  }
`

const Popover = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  box-shadow: ${({ theme }) => theme.shadows.overlay};
  padding: ${({ theme }) => theme.spacings.s8}px;
  position: absolute;
  right: 0;
  top: calc(100% + ${({ theme }) => theme.spacings.s8}px);
  z-index: 3;
`

const LocaleOption = styled(Flex)<{ $current: boolean }>`
  background: ${({ $current, theme }) => ($current ? theme.colors.accentBg : 'transparent')};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.r10}px;
  cursor: pointer;
`

const Flag = styled.img`
  border-radius: ${({ theme }) => theme.radii.r2}px;
  display: block;
  height: 14px;
  position: relative;
  width: 20px;
  z-index: 1;
`

export const Styled = {
  Flag,
  IconButton,
  LocaleOption,
  Popover,
}
