import { ensureSyntaxTree, syntaxTree } from '@codemirror/language'
import { type Diagnostic, lintGutter, linter } from '@codemirror/lint'
import type { EditorState } from '@codemirror/state'

import type { CodeEditorDiagnostic } from '../types'

const SYNTAX_ERROR = 'Синтаксическая ошибка'

const LINT_DELAY_MS = 300

const PARSE_TIMEOUT_MS = 200

const markAt = (state: EditorState, offset: number, message: string): Diagnostic => {
  const from = Math.min(Math.max(offset, 0), Math.max(state.doc.length - 1, 0))

  return { from, message, severity: 'error', to: Math.min(from + 1, state.doc.length) }
}

const offsetOf = (state: EditorState, { column, line }: CodeEditorDiagnostic): number => {
  const row = state.doc.line(Math.min(Math.max(line, 1), state.doc.lines))

  return row.from + Math.min(Math.max(column - 1, 0), row.length)
}

const firstTreeError = (state: EditorState): number | undefined => {
  const tree = ensureSyntaxTree(state, state.doc.length, PARSE_TIMEOUT_MS) ?? syntaxTree(state)
  const found: number[] = []

  tree.iterate({
    enter: (node) => {
      if (found.length > 0) {
        return false
      }

      if (node.type.isError) {
        found.push(node.from)

        return false
      }

      return undefined
    },
  })

  return found[0]
}

const markWordAt = (state: EditorState, offset: number, message: string): Diagnostic => {
  const word = state.wordAt(offset)

  return word ? { from: word.from, message, severity: 'error', to: word.to } : markAt(state, offset, message)
}

/**
 * Отметка ошибки.
 *
 * @description
 * - Синтаксис: место — первая ошибка разбора CodeMirror, он указывает на опечатку точнее компилятора.
 * - Текст — сообщение компилятора из прогона, если оно есть.
 * - Разбор ошибки не видит, а прогон видит — место берётся из прогона.
 * - Ошибка выполнения: место из стека, слово под ним подчёркнуто целиком.
 */
export const diagnosticsOf = (state: EditorState, diagnostic: CodeEditorDiagnostic | undefined): Diagnostic[] => {
  if (diagnostic?.kind === 'runtime') {
    return [markWordAt(state, offsetOf(state, diagnostic), diagnostic.message)]
  }

  const treeOffset = firstTreeError(state)

  if (diagnostic) {
    return [markAt(state, treeOffset ?? offsetOf(state, diagnostic), diagnostic.message)]
  }

  return treeOffset === undefined ? [] : [markAt(state, treeOffset, SYNTAX_ERROR)]
}

export const lintExtension = (current: () => CodeEditorDiagnostic | undefined) => [
  linter(({ state }) => diagnosticsOf(state, current()), { delay: LINT_DELAY_MS }),
  lintGutter(),
]
