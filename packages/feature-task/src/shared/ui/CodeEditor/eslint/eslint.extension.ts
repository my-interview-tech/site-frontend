import { linter, type Action, type Diagnostic } from '@codemirror/lint'
import type { Extension, Text } from '@codemirror/state'
import { ViewPlugin, type EditorView } from '@codemirror/view'

import { LINTED_LANGUAGES, type LintMessage, type LintResponse } from './eslint.protocol'

const LINT_DELAY_MS = 500

const FIX = 'Исправить'

/**
 * Воркер ESLint на время жизни редактора. Ответы на устаревшие запросы отбрасываются.
 */
class EslintClient {
  private lastId = 0

  private readonly pending = new Map<number, (messages: readonly LintMessage[]) => void>()

  private worker: Worker | null = null

  /** Последние замечания и текст, к которому они относятся. */
  last: { readonly diagnostics: readonly Diagnostic[]; readonly doc: Text } | null = null

  lint(code: string, language: string): Promise<readonly LintMessage[]> {
    this.lastId += 1

    const id = this.lastId
    const worker = this.ensure()

    this.pending.forEach((resolve) => resolve([]))
    this.pending.clear()

    return new Promise((resolve) => {
      this.pending.set(id, resolve)
      worker.postMessage({ code, id, language })
    })
  }

  destroy() {
    this.worker?.terminate()
    this.worker = null
    this.pending.forEach((resolve) => resolve([]))
    this.pending.clear()
  }

  private ensure(): Worker {
    if (!this.worker) {
      this.worker = new Worker(new URL('./eslint.worker.ts', import.meta.url), { type: 'module' })
      this.worker.onmessage = ({ data }: MessageEvent<LintResponse>) => {
        this.pending.get(data.id)?.(data.messages)
        this.pending.delete(data.id)
      }
    }

    return this.worker
  }
}

const eslintClient = ViewPlugin.define(() => new EslintClient())

const offsetAt = (doc: Text, line: number, column: number): number => {
  const row = doc.line(Math.min(Math.max(line, 1), doc.lines))

  return row.from + Math.min(Math.max(column - 1, 0), row.length)
}

const fixAction = (doc: Text, fix: NonNullable<LintMessage['fix']>): Action => ({
  apply: (view) => {
    if (view.state.doc.eq(doc)) {
      view.dispatch({ changes: { from: fix.range[0], insert: fix.text, to: fix.range[1] } })
    }
  },
  name: FIX,
})

const toDiagnostic = (doc: Text, { column, endColumn, endLine, fix, line, message, ruleId, severity }: LintMessage) => {
  const from = offsetAt(doc, line, column)
  const to = endLine && endColumn ? offsetAt(doc, endLine, endColumn) : Math.min(from + 1, doc.length)

  return {
    actions: fix ? [fixAction(doc, fix)] : undefined,
    from,
    message,
    severity: severity === 2 ? 'error' : 'warning',
    source: ruleId ?? undefined,
    to: Math.max(to, from),
  } satisfies Diagnostic
}

/**
 * Замечания ESLint к текущему тексту, если они уже посчитаны. Нужны, чтобы отметка прогона их не стирала.
 */
export const eslintDiagnostics = (view: EditorView): readonly Diagnostic[] => {
  const last = view.plugin(eslintClient)?.last

  return last && last.doc.eq(view.state.doc) ? last.diagnostics : []
}

/**
 * ESLint в отдельном воркере: ввод не тормозит, тяжёлый линтер грузится только при первом редакторе.
 */
export const eslintExtension = (language: string): Extension => {
  if (!LINTED_LANGUAGES.includes(language)) {
    return []
  }

  return [
    eslintClient,
    linter(
      async (view) => {
        const client = view.plugin(eslintClient)

        if (!client) {
          return []
        }

        const { doc } = view.state
        const messages = await client.lint(doc.toString(), language)
        const diagnostics = messages.map((message) => toDiagnostic(doc, message))

        client.last = { diagnostics, doc }

        return diagnostics
      },
      { delay: LINT_DELAY_MS }
    ),
  ]
}
