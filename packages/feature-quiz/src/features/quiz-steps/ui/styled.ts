import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Steps = styled(Flex)`
  min-width: 0;
  overflow-x: auto;

  &::before {
    background: ${theme.colors.border};
    content: '';
    height: 2px;
    left: 18px;
    position: absolute;
    right: 18px;
    top: 17px;
  }
`

const Step = styled.button<{
  $current: boolean
  $missed: boolean
  $open: boolean
  $tone?: 'correct' | 'empty' | 'wrong'
}>`
  ${textStyle(400, { weight: 'semibold' })}
  background: ${({ $current, $missed, $open, $tone }) => {
    if ($tone === 'correct') {
      return $current ? theme.colors.success : theme.colors.successBg
    }

    if ($tone === 'wrong') {
      return $current ? theme.colors.danger : theme.colors.dangerBg
    }

    if ($tone === 'empty') {
      return theme.colors.surface
    }

    if ($missed) {
      return theme.colors.dangerBg
    }

    if ($current) {
      return theme.colors.accent
    }

    if ($open) {
      return theme.colors.accentBg
    }

    return theme.colors.surface
  }};
  border: 1px solid
    ${({ $current, $missed, $open, $tone }) => {
      if ($tone === 'correct') {
        return theme.colors.success
      }

      if ($tone === 'wrong') {
        return theme.colors.danger
      }

      if ($tone === 'empty') {
        return theme.colors.textTertiary
      }

      if ($missed) {
        return theme.colors.danger
      }

      if ($current || $open) {
        return theme.colors.accent
      }

      return theme.colors.border
    }};
  border-radius: ${theme.radii.rPill}px;
  color: ${({ $current, $missed, $open, $tone }) => {
    if ($tone === 'correct') {
      return $current ? theme.colors.white : theme.colors.success
    }

    if ($tone === 'wrong') {
      return $current ? theme.colors.white : theme.colors.danger
    }

    if ($tone === 'empty') {
      return theme.colors.textTertiary
    }

    if ($missed) {
      return theme.colors.danger
    }

    if ($current) {
      return theme.colors.white
    }

    if ($open) {
      return theme.colors.accent
    }

    return theme.colors.textTertiary
  }};
  cursor: ${({ $current, $open, $tone }) => ($tone || ($open && !$current) ? 'pointer' : 'default')};
  flex-shrink: 0;
  height: 36px;
  padding: 0;
  position: relative;
  width: 36px;
  z-index: 1;

  &:disabled {
    cursor: default;
  }
`

const SummaryStep = styled(Step)`
  padding: 0 ${theme.spacings.s12}px;
  width: auto;
`

export const Styled = {
  Step,
  Steps,
  SummaryStep,
}
