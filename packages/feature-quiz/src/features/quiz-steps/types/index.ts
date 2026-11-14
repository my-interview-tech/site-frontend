import type { QuizComponent, ResultItem } from '@quiz/shared/model'

export type QuizStepsProps = {
  /**
   * Вопросы без ответа после конца времени.
   */
  missed: ReadonlySet<string>
  /**
   * Шаги квиза.
   */
  pages: QuizComponent[][]
  /**
   * Самый дальний открытый шаг.
   */
  reached: number
  /**
   * Итог сдачи. `null` — квиз ещё идёт.
   */
  result: ResultItem[] | null
  /**
   * Открытый шаг в разборе. `null` — сводка.
   */
  review: number | null
  /**
   * Текущий шаг, пока квиз не сдан.
   */
  step: number
  /**
   * Открыть шаг.
   */
  onOpen: (index: number) => void
  /**
   * Закрыть разбор и показать сводку.
   */
  onSummary: () => void
}
