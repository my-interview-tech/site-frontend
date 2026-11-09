import { useEffect, useLayoutEffect, useMemo, useRef } from 'react'

import { setDiagnostics } from '@codemirror/lint'
import { Compartment, EditorState } from '@codemirror/state'
import { EditorView, placeholder as placeholderExtension } from '@codemirror/view'
import { basicSetup } from 'codemirror'
import { useTheme } from 'styled-components'

import { caseToneExtension } from '../lib/caseTone'
import { completionExtension } from '../lib/completion'
import { bindingsExtension, bindingsSignature, editingKeymap } from '../lib/keymap'
import { diagnosticsOf, lintExtension } from '../lib/lint'
import { readOnlyRangesExtension } from '../lib/readOnly'
import { appearanceExtension, highlightExtension, indentExtension, languageExtension } from '../lib/theme'
import type { CodeEditorProps } from '../types'
import { eslintDiagnostics, eslintExtension } from '../eslint'
import { Styled } from './styled'

/**
 * Редактор кода.
 *
 * @description
 * - Правка — полный набор CodeMirror: номера строк, скобки, история, автодополнение, ESLint, отметка ошибки.
 * - Tab — отступ или выбор подсказки. Выйти из редактора с клавиатуры — Esc, затем Tab.
 * - Только чтение — сниппет без гаттера, но с линиями отступов.
 * - Смена темы пересоздаёт редактор с текущим текстом, а не стартовым.
 */
export const CodeEditor = ({
  autoFocus = false,
  caseMessage,
  caseState,
  completions,
  diagnostic,
  extensions,
  fill = false,
  focusNonce = 0,
  keyBindings,
  label,
  language,
  lint = true,
  onChange,
  placeholder,
  readOnly = false,
  readOnlyRanges,
  value,
}: CodeEditorProps) => {
  const hostRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)
  const valueRef = useRef(value)
  const onChangeRef = useRef(onChange)
  const diagnosticRef = useRef(diagnostic)
  const bindingsRef = useRef(keyBindings)
  const rangesRef = useRef(readOnlyRanges)
  const bindingsCompartment = useMemo(() => new Compartment(), [])
  const toneCompartment = useMemo(() => new Compartment(), [])
  const bindings = useMemo(
    () => bindingsExtension(bindingsCompartment, () => bindingsRef.current),
    [bindingsCompartment]
  )

  valueRef.current = value
  onChangeRef.current = onChange
  diagnosticRef.current = diagnostic
  bindingsRef.current = keyBindings

  const toneRef = useRef(caseState ? { message: caseMessage, state: caseState } : null)

  toneRef.current = caseState ? { message: caseMessage, state: caseState } : null

  const signature = bindingsSignature(keyBindings)
  const completionKey = (completions ?? []).map((item) => item.label).join(',')

  const theme = useTheme()
  const appearance = useMemo(() => appearanceExtension(theme, { fill, readOnly }), [fill, readOnly, theme])
  const highlight = useMemo(() => highlightExtension(theme), [theme])
  const indent = useMemo(() => indentExtension(theme), [theme])
  const languageSupport = useMemo(() => languageExtension(language), [language])
  const completion = useMemo(
    () => completionExtension(language, completions),
    // Подсказки сравниваются по меткам: новый массив с теми же именами не пересоздаёт редактор.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [completionKey, language]
  )

  useLayoutEffect(() => {
    const parent = hostRef.current

    if (!parent) {
      return undefined
    }

    const editing = readOnly
      ? [toneCompartment.of(toneRef.current ? caseToneExtension(toneRef.current) : [])]
      : [
          basicSetup,
          editingKeymap,
          bindings.initial,
          completion,
          lintExtension(() => diagnosticRef.current),
          lint ? eslintExtension(language) : [],
          readOnlyRangesExtension(rangesRef.current),
          placeholder ? placeholderExtension(placeholder) : [],
        ]

    const view = new EditorView({
      parent,
      state: EditorState.create({
        doc: valueRef.current,
        extensions: [
          editing,
          languageSupport,
          highlight,
          indent,
          appearance,
          extensions ?? [],
          EditorView.lineWrapping,
          EditorView.editable.of(!readOnly),
          EditorState.readOnly.of(readOnly),
          EditorView.contentAttributes.of({ 'aria-label': label }),
          EditorView.updateListener.of((update) => {
            if (update.docChanged && onChangeRef.current) {
              onChangeRef.current(update.state.doc.toString())
            }
          }),
        ],
      }),
    })

    viewRef.current = view

    if (autoFocus && !readOnly) {
      view.focus()
    }

    return () => {
      viewRef.current = null
      view.destroy()
    }
    // autoFocus и placeholder читаются при создании: смена не должна сбрасывать историю правок.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    appearance,
    bindings,
    completion,
    extensions,
    highlight,
    indent,
    label,
    language,
    languageSupport,
    lint,
    readOnly,
    toneCompartment,
  ])

  useEffect(() => {
    viewRef.current?.dispatch({ effects: bindingsCompartment.reconfigure(bindings.build()) })
  }, [bindings, bindingsCompartment, signature])

  useEffect(() => {
    if (!focusNonce || readOnly) {
      return
    }

    viewRef.current?.focus()
  }, [focusNonce, readOnly])

  useEffect(() => {
    const view = viewRef.current

    if (!view || !readOnly) {
      return
    }

    view.dispatch({
      effects: toneCompartment.reconfigure(
        caseState ? caseToneExtension({ message: caseMessage, state: caseState }) : []
      ),
    })
  }, [caseMessage, caseState, readOnly, toneCompartment])

  useEffect(() => {
    const view = viewRef.current

    if (view && !readOnly) {
      view.dispatch(setDiagnostics(view.state, [...diagnosticsOf(view.state, diagnostic), ...eslintDiagnostics(view)]))
    }
  }, [diagnostic, readOnly])

  return <Styled.Host ref={hostRef} $fill={fill} />
}
