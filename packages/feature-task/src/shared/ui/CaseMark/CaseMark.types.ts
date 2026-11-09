/** `idle` — тест ещё не гоняли. */
export type CaseState = 'failed' | 'idle' | 'passed'

/** Отметка результата теста. */
export interface CaseMarkProps {
  readonly state: CaseState
}
