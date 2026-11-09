/** Запрос в воркер ESLint. */
export type LintRequest = {
  readonly code: string
  readonly id: number
  readonly language: string
}

/** Замечание ESLint: строки и колонки с единицы, `fix.range` — смещения в проверенном тексте. */
export type LintMessage = {
  readonly column: number
  readonly endColumn?: number
  readonly endLine?: number
  readonly fix?: { readonly range: readonly [number, number]; readonly text: string }
  readonly line: number
  readonly message: string
  readonly ruleId: string | null
  readonly severity: 1 | 2
}

/** Ответ воркера ESLint. */
export type LintResponse = {
  readonly id: number
  readonly messages: readonly LintMessage[]
}

/** Языки, которые проверяет ESLint: espree не разбирает типы TypeScript. */
export const LINTED_LANGUAGES: readonly string[] = ['javascript', 'react']
