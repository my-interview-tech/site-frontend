import type { ReactNode } from 'react'

import type { Quiz, QuizRequest } from '@quiz/shared/model'

export type QuizViewProps = {
  /**
   * Идентификатор квиза.
   */
  id: string

  /**
   * Узел над содержимым после загрузки. Хост передаёт крошки.
   */
  nav?: (quiz: Quiz) => ReactNode

  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void

  /**
   * Все ответы верные.
   */
  onSolved?: (quiz: QuizRequest) => void

  /**
   * Слаг технологии.
   */
  tech: string
}
