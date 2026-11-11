import styled, { keyframes } from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, textStyle, theme } from '@my-interview/ui-kit'

import type { ConsoleLevel } from '@task/shared/model'

const MONO = 'ui-monospace, sfmono-regular, menlo, consolas, monospace'

const CONSOLE_HEIGHT = 220

const Panel = styled(Card)`
  min-height: 0;
  overflow: hidden;
`

const Editor = styled(Panel)`
  flex: none;
  height: 60dvh;
  min-height: 360px;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    flex: 1;
    height: auto;
    min-height: 0;
  }
`

const Toolbar = styled(Flex)`
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.borderSoft : 'transparent')};
  border-bottom: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`

const Body = styled.div`
  background: ${({ theme }) => (theme.mode === 'light' ? theme.colors.surface : theme.colors.codeBg)};
  flex: 1;
  min-height: 0;
`

const Console = styled(Panel)`
  background: ${theme.colors.codeBg};
  border-color: ${theme.colors.codeBorder};
  color: ${theme.colors.textPrimary};
  flex-shrink: 0;
  font-family: ${MONO};
  height: auto;
  min-height: 200px;

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    height: ${CONSOLE_HEIGHT}px;
    min-height: 0;
  }
`

const ConsoleHead = styled(Flex)`
  ${textStyle(200)}
  background: ${theme.colors.codeHeader};
  border-bottom: 1px solid ${theme.colors.codeBorder};
  flex-shrink: 0;
`

const ConsoleBody = styled(Flex)`
  ${textStyle(300)}
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  scrollbar-color: ${`${theme.colors.codeBorder} ${theme.colors.codeBg}`};
`

const LOG_COLOR = {
  debug: theme.colors.textTertiary,
  error: theme.colors.danger,
  info: theme.colors.blue,
  log: theme.colors.textPrimary,
  warn: theme.colors.warning,
} as const satisfies Record<ConsoleLevel, string>

const Log = styled.p<{ $level: ConsoleLevel }>`
  color: ${({ $level }) => LOG_COLOR[$level]};
  margin: 0;
  white-space: pre-wrap;
`

const rise = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: none;
  }
`

const Actions = styled(Flex)`
  border-top: 1px solid ${theme.colors.border};
  flex-shrink: 0;
`

const Reveal = styled.div`
  animation: ${rise} 0.35s ease;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`

export const Styled = {
  Actions,
  Body,
  Console,
  ConsoleBody,
  ConsoleHead,
  Editor,
  Log,
  Reveal,
  Toolbar,
}
