import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react'

import type { Completion } from '@codemirror/autocomplete'
import type { KeyBinding } from '@codemirror/view'

import { markSolved } from '@my-interview/common'
import { Button, Flex, Icon, IconButton, Link, theme } from '@my-interview/ui-kit'

import { isAbortError, prewarm, runTask, submitTask } from '@task/shared/api'
import { draftKey, useDraft, useTaskRunners } from '@task/shared/lib'
import type { RunMode, RunReport } from '@task/shared/model'
import { CodeEditor, type CodeEditorDiagnostic } from '@task/shared/ui'

import { LANGUAGE_ICON, SHORTCUTS, TEXT } from '../../constants'
import { diagnosticOf, isAccepted } from '../../lib'
import type { TaskAttemptProps } from '../../types'
import { Styled } from '../styled'

const CRASH: RunReport = { cases: [], error: TEXT.CRASH }

/**
 * Редактор решения с тулбаром.
 *
 * @description
 * - «Запустить» и «Сдать» гоняют тесты и терминал.
 * - Пока идёт прогон, кнопки и клавиши заблокированы. Уход со страницы отменяет прогон.
 * - Черновик переживает перезагрузку. «Сбросить» возвращает стартовый код, удаляет черновик и прошлый прогон.
 * - Ошибка из прогона отмечена в редакторе, пока код не изменили.
 */
export const TaskAttempt = ({
  draftStorage,
  hints,
  id,
  language,
  onAcceptedChange,
  onReset,
  onRun,
  onRunComplete,
  onSolved,
  running,
  starter,
  tasksHref,
  tech,
}: TaskAttemptProps) => {
  const runners = useTaskRunners()
  const {
    code,
    reset: resetDraft,
    setCode,
  } = useDraft({
    initial: starter,
    key: draftKey(tech, id),
    storage: draftStorage,
  })
  const [acceptedCode, setAcceptedCode] = useState<string | null>(null)
  const [ran, setRan] = useState(false)
  const [focusNonce, setFocusNonce] = useState(0)
  const [revision, setRevision] = useState(0)
  const [failure, setFailure] = useState<{ code: string; diagnostic: CodeEditorDiagnostic } | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const diagnostic = failure?.code === code ? failure.diagnostic : undefined
  const solved = acceptedCode === code

  const completions = useMemo<Completion[]>(
    () => (hints ?? []).map((label) => ({ boost: 1, label, type: 'variable' })),
    [hints]
  )

  useEffect(() => {
    prewarm()

    return () => controllerRef.current?.abort()
  }, [])

  useEffect(() => {
    onAcceptedChange?.(solved)
  }, [onAcceptedChange, solved])

  const run = (mode: RunMode) => {
    if (running) {
      return
    }

    if (mode === 'submit') {
      controllerRef.current?.abort()
    }

    const controller = new AbortController()
    const submitted = code
    const options = { runners, signal: controller.signal }

    controllerRef.current = controller
    onRun({ mode, report: null, running: true })

    const request =
      mode === 'submit'
        ? submitTask({ code: submitted, id, language, tech }, options)
        : runTask({ code: submitted, language, preview: true, tests: [] }, options)

    request
      .catch((error: unknown) => {
        if (isAbortError(error)) {
          return null
        }

        return CRASH
      })
      .then((report) => {
        if (!report || controller.signal.aborted) {
          return
        }

        if (mode === 'submit') {
          const next = diagnosticOf(report)

          setFailure(next ? { code: submitted, diagnostic: next } : null)
          setAcceptedCode(isAccepted(report) ? submitted : null)

          if (isAccepted(report)) {
            markSolved(tech, id)
            onSolved?.({ id, tech })
          }
        }

        setRan(true)
        onRun({ mode, report, running: false })
        onRunComplete?.(report, mode)
      })
  }

  const keyBindings: KeyBinding[] = [
    {
      key: 'Mod-Enter',
      run: () => {
        run('sample')

        return true
      },
      shift: () => {
        run('submit')

        return true
      },
    },
  ]

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.defaultPrevented || event.key !== 'Enter' || !(event.metaKey || event.ctrlKey)) {
      return
    }

    event.preventDefault()
    run(event.shiftKey ? 'submit' : 'sample')
  }

  const reset = () => {
    resetDraft()
    setAcceptedCode(null)
    setRan(false)
    setFailure(null)
    setRevision((value) => value + 1)
    onReset?.()
  }

  return (
    <Styled.Editor aria-label={TEXT.EDITOR} flexDirection="column" forwardedAs="section" onKeyDown={handleKeyDown}>
      <Styled.Toolbar
        alignItems="center"
        flexWrap="wrap"
        gap={theme.spacings.s16}
        justifyContent="space-between"
        p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
      >
        <Flex alignItems="center" gap={theme.spacings.s16}>
          <Button variant="text" onClick={() => setFocusNonce((value) => value + 1)}>
            {TEXT.EDITOR}
          </Button>

          <IconButton
            disabled={running || (code === starter && !ran)}
            iconSrc="icon-reset"
            label={TEXT.RESET}
            size={32}
            title={TEXT.RESET}
            variant="text"
            onClick={reset}
          />
        </Flex>

        {LANGUAGE_ICON[language] && <Icon iconSrc={LANGUAGE_ICON[language]} size={28} />}
      </Styled.Toolbar>
      <Styled.Body>
        <CodeEditor
          fill
          completions={completions}
          diagnostic={diagnostic}
          focusNonce={focusNonce}
          keyBindings={keyBindings}
          key={revision}
          label={TEXT.EDITOR}
          language={language}
          value={code}
          onChange={setCode}
        />
      </Styled.Body>
      <Styled.Actions
        alignItems="center"
        gap={theme.spacings.s8}
        justifyContent="flex-end"
        p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
      >
        {solved ? (
          <Styled.Reveal>
            <Button as={Link} href={tasksHref} size={48} variant="primary">
              {TEXT.SOLUTIONS}
            </Button>
          </Styled.Reveal>
        ) : (
          <>
            <Button aria-keyshortcuts={SHORTCUTS.sample} disabled={running} size={48} onClick={() => run('sample')}>
              {TEXT.RUN}
            </Button>
            <Button
              aria-keyshortcuts={SHORTCUTS.submit}
              disabled={running}
              size={48}
              variant="primary"
              onClick={() => run('submit')}
            >
              {TEXT.SUBMIT}
            </Button>
          </>
        )}
      </Styled.Actions>
    </Styled.Editor>
  )
}
