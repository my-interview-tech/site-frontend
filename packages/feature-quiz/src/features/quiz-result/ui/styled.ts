import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Form = styled(Flex)`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`

const Fact = styled.span`
  ${textStyle(200)}
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.rPill}px;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacings.s4}px ${theme.spacings.s12}px;
`

const Picked = styled(Flex)<{ $status: 'correct' | 'empty' | 'wrong' }>`
  ${textStyle(400)}
  background: ${({ $status }) => {
    if ($status === 'correct') {
      return theme.colors.successBg
    }

    if ($status === 'wrong') {
      return theme.colors.dangerBg
    }

    return theme.colors.surface
  }};
  border: 1px solid
    ${({ $status }) => {
      if ($status === 'correct') {
        return theme.colors.success
      }

      if ($status === 'wrong') {
        return theme.colors.danger
      }

      return theme.colors.textTertiary
    }};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textPrimary};
  padding: ${theme.spacings.s14}px ${theme.spacings.s16}px;
`

const BreakdownRow = styled(Flex)`
  background: transparent;
  border: 0;
  cursor: pointer;
  padding: 0;
  text-align: left;
  width: 100%;
`

const Mark = styled.span<{ $status: 'correct' | 'empty' | 'wrong' }>`
  ${textStyle(400, { weight: 'semibold' })}
  color: ${({ $status }) => {
    if ($status === 'correct') {
      return theme.colors.accent
    }

    if ($status === 'empty') {
      return theme.colors.textTertiary
    }

    return theme.colors.danger
  }};
  flex-shrink: 0;
`

export const Styled = {
  BreakdownRow,
  Fact,
  Form,
  Mark,
  Picked,
}
