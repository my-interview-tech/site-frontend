import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

import { CARD_HEIGHT, CARD_WIDTH } from '../../lib/flow'

const Tip = styled.span`
  ${textStyle(200)}
  background: ${theme.colors.ink};
  border-radius: ${theme.radii.r10}px;
  bottom: calc(100% + ${theme.spacings.s8}px);
  color: ${theme.colors.surface};
  left: 50%;
  max-width: ${CARD_WIDTH}px;
  opacity: 0;
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  pointer-events: none;
  position: absolute;
  transform: translateX(-50%);
  transition: opacity 160ms ease;
  width: max-content;
  z-index: 2;

  &::after {
    border-left: ${theme.spacings.s6}px solid transparent;
    border-right: ${theme.spacings.s6}px solid transparent;
    border-top: ${theme.spacings.s6}px solid ${theme.colors.ink};
    bottom: -${theme.spacings.s6}px;
    content: '';
    left: 50%;
    position: absolute;
    transform: translateX(-50%);
  }
`

const Stack = styled.div<{ $isDimmed: boolean }>`
  opacity: ${({ $isDimmed }) => ($isDimmed ? 0.4 : 1)};
  position: relative;
  width: 100%;

  &:hover ${Tip}, &:focus-within ${Tip} {
    opacity: 1;
  }
`

const Root = styled(Flex)<{ $isDisabled: boolean; $isFluid: boolean }>`
  background: ${({ $isDisabled }) => ($isDisabled ? theme.colors.page : theme.colors.surface)};
  border: 1px solid ${theme.colors.borderCard};
  border-radius: ${theme.radii.r12}px;
  box-shadow: ${({ $isDisabled }) => ($isDisabled ? 'none' : theme.shadows.sm)};
  box-sizing: border-box;
  color: inherit;
  cursor: ${({ $isDisabled }) => ($isDisabled ? 'not-allowed' : 'pointer')};
  min-height: ${CARD_HEIGHT}px;
  opacity: ${({ $isDisabled }) => ($isDisabled ? 0.55 : 1)};
  text-decoration: none;
  width: ${({ $isFluid }) => ($isFluid ? '100%' : `${CARD_WIDTH}px`)};

  &:hover {
    border-color: ${({ $isDisabled }) => ($isDisabled ? theme.colors.borderCard : theme.colors.accentLine)};
    box-shadow: ${({ $isDisabled }) => ($isDisabled ? 'none' : theme.shadows.md)};
  }

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }
`

const Mark = styled(Flex)`
  background: ${theme.colors.accentBg};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.accent};
  height: ${theme.spacings.s40}px;
  width: ${theme.spacings.s40}px;
`

const Copy = styled(Flex)`
  min-width: 0;
`

const Name = styled.span`
  ${textStyle(500, { weight: 'semibold' })}
  color: ${theme.colors.ink};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Signal = styled.span<{ $tone: 'gap' | 'idle' | 'known' }>`
  background: ${({ $tone }) =>
    ({
      gap: theme.colors.danger,
      idle: theme.colors.faint,
      known: theme.colors.accent,
    })[$tone]};
  border-radius: 50%;
  flex-shrink: 0;
  height: ${theme.spacings.s8}px;
  width: ${theme.spacings.s8}px;
`

const Know = styled(Flex)<{ $isKnown: boolean }>`
  background: ${({ $isKnown }) => ($isKnown ? theme.colors.accent : theme.colors.surface)};
  border: 1.5px solid ${({ $isKnown }) => ($isKnown ? theme.colors.accent : theme.colors.borderStrong)};
  border-radius: 50%;
  color: ${theme.colors.white};
  height: ${theme.spacings.s16 + theme.spacings.s2}px;
  width: ${theme.spacings.s16 + theme.spacings.s2}px;
`

export const Styled = {
  Copy,
  Know,
  Mark,
  Name,
  Root,
  Signal,
  Stack,
  Tip,
}
