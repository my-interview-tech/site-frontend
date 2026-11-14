import { useEffect, useRef } from 'react'

import { Flex, IconButton, theme } from '@my-interview/ui-kit'

import { TEXT } from '../../constants'
import type { TaskConsoleProps } from '../../types'
import { LogLine } from '../LogLine'
import { Styled } from '../styled'

/**
 * Накопленный вывод `console`. Очистка обнуляет стек, новый прогон дописывает строки.
 */
export const TaskConsole = ({ entries, onClear }: TaskConsoleProps) => {
  const bodyRef = useRef<HTMLDivElement>(null)
  const output = entries.map((entry) => entry.text).join('\n')

  useEffect(() => {
    const node = bodyRef.current

    if (node) {
      node.scrollTop = node.scrollHeight
    }
  }, [entries])

  return (
    <Styled.Console aria-label={TEXT.RESULT} aria-live="polite" flexDirection="column" forwardedAs="section">
      <Styled.ConsoleHead
        alignItems="center"
        gap={theme.spacings.s12}
        justifyContent="space-between"
        p={`${theme.spacings.s4}px ${theme.spacings.s12}px`}
      >
        <span>{TEXT.RESULT}</span>

        <Flex inline gap={theme.spacings.s4}>
          <IconButton
            disabled={!output}
            iconSrc="icon-clear"
            label={TEXT.CLEAR}
            size={32}
            title={TEXT.CLEAR}
            variant="text"
            onClick={onClear}
          />

          <IconButton
            disabled={!output}
            iconSrc="icon-copy"
            label={TEXT.COPY}
            size={32}
            title={TEXT.COPY}
            variant="text"
            onClick={() => {
              void navigator.clipboard.writeText(output)
            }}
          />
        </Flex>
      </Styled.ConsoleHead>
      <Styled.ConsoleBody
        ref={bodyRef}
        flexDirection="column"
        gap={theme.spacings.s2}
        p={`${theme.spacings.s10}px ${theme.spacings.s12}px`}
      >
        {entries.map((entry, index) => (
          <LogLine entry={entry} key={`${entry.level}-${index}`} />
        ))}
      </Styled.ConsoleBody>
    </Styled.Console>
  )
}
