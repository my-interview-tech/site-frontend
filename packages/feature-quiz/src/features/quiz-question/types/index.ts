import type { ReactNode } from 'react'

import type { QuizChoice } from '@quiz/shared/model'

export type QuizQuestionProps = {
  /**
   * Можно вернуться на предыдущий шаг.
   */
  canGoBack: boolean
  /**
   * Видимый вопрос.
   */
  choice?: QuizChoice
  /**
   * Подзаголовок шага.
   */
  description?: string
  /**
   * Ошибка поля.
   */
  error?: string
  /**
   * Подпись кнопки шага. Без неё — «Продолжить».
   */
  footerLabel?: string
  /**
   * Подпись шага из navBar.
   */
  navLabel?: string
  /**
   * Узел шагов над вопросом.
   */
  steps: ReactNode
  /**
   * Название квиза.
   */
  title: string
  /**
   * Выбранный вариант.
   */
  value: string
  /**
   * Предыдущий шаг.
   */
  onBack: () => void
  /**
   * Сдача с submit формы.
   */
  onFinish: () => void
  /**
   * К описанию квиза.
   */
  onIntro: () => void
  /**
   * Дальше или сдача с кнопки шага.
   */
  onPrimary: () => void
  /**
   * Выбрать вариант.
   */
  onSelect: (optionId: string) => void
}
