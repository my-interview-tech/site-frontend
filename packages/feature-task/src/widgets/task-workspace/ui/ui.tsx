import { useEffect, useMemo, useState } from 'react'

import { Chip, Flex, theme } from '@my-interview/ui-kit'

import { isAccepted, TaskAttempt, TaskConsole, type AttemptRun } from '@task/features/task-attempt'
import { TaskStatement } from '@task/entities/task-statement'
import type { ConsoleEntry, RunReport } from '@task/shared/model'

import { TABS } from '../constants'
import type { TaskWorkspaceProps, WorkspaceTab } from '../types'
import { Styled } from './styled'

/**
 * Рабочая область задачи.
 *
 * @description
 * - Панели занимают высоту окна и скроллятся внутри себя.
 * - «Сдать» обновляет отметки тестов. «Запустить» пишет только в терминал.
 * - Ниже планшета видна одна панель, переключение чипами. Запуск открывает Terminal.
 */
export const TaskWorkspace = ({
  draftStorage,
  hiddenCount,
  hints,
  id,
  interview,
  language,
  lead,
  onRunComplete,
  onSolved,
  outcome,
  skill,
  starter,
  statement,
  tasksHref,
  tech,
  tests,
  title,
}: TaskWorkspaceProps) => {
  const [failed, setFailed] = useState(false)
  const [run, setRun] = useState<AttemptRun | null>(null)
  const [solved, setSolved] = useState(false)
  const [stack, setStack] = useState<ConsoleEntry[]>([])
  const [tab, setTab] = useState<WorkspaceTab>('statement')
  const [verdict, setVerdict] = useState<RunReport | null>(null)

  useEffect(() => {
    if (!run || run.mode !== 'submit') {
      return undefined
    }

    if (run.running || !run.report) {
      setFailed(false)

      return undefined
    }

    if (isAccepted(run.report)) {
      setFailed(false)

      return undefined
    }

    setFailed(true)

    const timer = window.setTimeout(() => setFailed(false), 3000)

    return () => window.clearTimeout(timer)
  }, [run])

  const results = useMemo(
    () =>
      verdict
        ? Object.fromEntries(verdict.cases.map((item) => [item.id, { message: item.message, passed: item.passed }]))
        : undefined,
    [verdict]
  )

  const handleRun = (next: AttemptRun) => {
    setRun(next)

    if (!next.running && next.report) {
      const lines: ConsoleEntry[] = [...(next.report.logs ?? [])]

      if (next.report.error) {
        lines.unshift({ level: 'error', text: next.report.error })
      }

      if (lines.length > 0) {
        setStack((current) => [...current, ...lines])
      }
    }

    if (!next.running && next.mode === 'submit' && next.report) {
      setVerdict(next.report)
    }

    if (next.running) {
      setTab('result')
    }
  }

  return (
    <Flex flexDirection="column" gap={theme.spacings.s12}>
      <Styled.Tabs gap={theme.spacings.s8}>
        {TABS.map(({ id, label }) => (
          <Chip key={id} isSelected={tab === id} size={32} onClick={() => setTab(id)}>
            {label}
          </Chip>
        ))}
      </Styled.Tabs>

      <Styled.Grid>
        <Styled.Pane $hidden={tab !== 'statement'} flexDirection="column">
          <TaskStatement
            hiddenCount={hiddenCount}
            interview={interview}
            language={language}
            lead={lead}
            outcome={outcome}
            failed={failed}
            results={results}
            running={Boolean(run?.running && run.mode === 'submit')}
            skill={skill}
            solved={solved}
            statement={statement}
            tasksHref={tasksHref}
            tests={tests}
            title={title}
          />
        </Styled.Pane>

        <Styled.Pane $hidden={tab === 'statement'} flexDirection="column" gap={theme.spacings.s12}>
          <Styled.Pane $hidden={tab !== 'code'} flex={1} flexDirection="column">
            <TaskAttempt
              draftStorage={draftStorage}
              hints={hints}
              id={id}
              language={language}
              running={run?.running ?? false}
              starter={starter}
              tech={tech}
              tests={tests}
              onAcceptedChange={setSolved}
              onReset={() => {
                setRun(null)
                setStack([])
                setVerdict(null)
              }}
              onRun={handleRun}
              tasksHref={tasksHref}
              onRunComplete={onRunComplete}
              onSolved={onSolved}
            />
          </Styled.Pane>
          <Styled.Pane $hidden={tab !== 'result'} flexDirection="column">
            <TaskConsole entries={stack} onClear={() => setStack([])} />
          </Styled.Pane>
        </Styled.Pane>
      </Styled.Grid>
    </Flex>
  )
}
