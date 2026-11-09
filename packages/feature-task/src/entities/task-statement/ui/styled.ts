import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, textStyle, theme } from '@my-interview/ui-kit'

import type { SuiteState } from '../types'

const MONO = 'ui-monospace, sfmono-regular, menlo, monospace'

const Column = styled(Flex)`
  flex: 1;
  min-height: 0;
  overflow: hidden;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    flex: none;
    overflow: visible;
  }
`

const Panel = styled(Card)<{ $failed?: boolean; $share?: number; $solved?: boolean }>`
  border-color: ${({ $failed, $solved }) => {
    if ($solved) {
      return theme.colors.success
    }

    if ($failed) {
      return theme.colors.danger
    }

    return theme.colors.border
  }};
  flex: ${({ $share }) => $share ?? 1} 1 0%;
  min-height: 0;
  overflow-y: auto;
  transition: border-color 0.35s ease;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    flex: none;
    overflow: visible;
  }
`

const Tick = styled.span<{ $isOn: boolean }>`
  background: ${({ $isOn }) => ($isOn ? theme.colors.accent : theme.colors.chip)};
  border-radius: ${theme.radii.r2}px;
  height: 8px;
  width: 18px;
`

const Tests = styled.div`
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.surface : theme.colors.codeBg)};
  border: 1px solid ${theme.colors.codeBorder};
  border-radius: ${theme.radii.r10}px;
  overflow: visible;

  .cm-editor {
    background: transparent;
    border: none;
    border-radius: 0;
  }
`

const Case = styled(Flex)`
  min-width: 0;

  & + & {
    border-top: 1px solid ${theme.colors.codeBorder};
  }
`

const Sheet = styled.table`
  ${textStyle(300)}
  border-collapse: collapse;
  font-family: ${MONO};
  width: 100%;
`

const toneColor = (
  $state: SuiteState | undefined,
  fallback: 'textPrimary'
): 'danger' | 'success' | 'textPrimary' | 'textSecondary' => {
  if ($state === 'failed') {
    return 'danger' as const
  }

  if ($state === 'passed') {
    return 'success' as const
  }

  if ($state === 'idle' || $state === 'running') {
    return 'textSecondary' as const
  }

  return fallback
}

const Cell = styled.td<{ $state?: SuiteState }>`
  border-bottom: 1px solid ${theme.colors.codeBorder};
  color: ${({ $state }) => theme.colors[toneColor($state, 'textPrimary')]};
  padding: ${`${theme.spacings.s8}px ${theme.spacings.s12}px`};
  vertical-align: middle;
`

const Mark = styled(Cell)`
  text-align: center;
  width: 32px;
`

const Kind = styled(Cell)`
  color: ${theme.colors.textSecondary};
  white-space: nowrap;
  width: 1%;
`

const Caption = styled.th`
  border-bottom: 1px solid ${theme.colors.codeBorder};
  color: ${theme.colors.textSecondary};
  font-weight: 500;
  padding: ${`${theme.spacings.s8}px ${theme.spacings.s12}px`};
  text-align: left;
`

export const Styled = {
  Caption,
  Case,
  Cell,
  Column,
  Kind,
  Mark,
  Panel,
  Sheet,
  Tests,
  Tick,
}
