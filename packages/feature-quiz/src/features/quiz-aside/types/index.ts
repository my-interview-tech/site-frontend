export type QuizClockProps = {
  /**
   * Секунды до конца попытки.
   */
  left: number
}

export type QuizScoreProps = {
  /**
   * Число верных ответов.
   */
  correctCount: number
  /**
   * Сколько вопросов в итоге.
   */
  total: number
}
