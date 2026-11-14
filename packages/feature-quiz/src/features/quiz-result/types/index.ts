import type { ReactNode } from 'react'

import type { ResultItem, ResultStatus } from '@quiz/shared/model'

/**
 * Открытый разбор одного вопроса.
 */
export type QuizResultReview = {
  /**
   * Выбранный текст. `null` — вопрос без ответа.
   */
  answer: string | null
  /**
   * Сколько шагов в квизе.
   */
  pagesCount: number
  /**
   * Текст вопроса.
   */
  question: string
  /**
   * Верный, неверный или пустой ответ.
   */
  status: ResultStatus
  /**
   * Номер шага с единицы.
   */
  stepNumber: number
}

export type QuizResultProps = {
  /**
   * Число верных ответов.
   */
  correctCount: number
  /**
   * Число пустых ответов.
   */
  emptyCount: number
  /**
   * Все ответы верные.
   */
  passed: boolean
  /**
   * Разобранные ответы.
   */
  result: ResultItem[]
  /**
   * Открытый вопрос. `null` — сводка.
   */
  review: QuizResultReview | null
  /**
   * Узел шагов над итогом.
   */
  steps: ReactNode
  /**
   * Число неверных ответов.
   */
  wrongCount: number
  /**
   * Закрыть разбор и показать сводку.
   */
  onCloseReview: () => void
  /**
   * Открыть разбор вопроса.
   */
  onOpen: (id: string) => void
  /**
   * Новая попытка.
   */
  onRetry: () => void
}
