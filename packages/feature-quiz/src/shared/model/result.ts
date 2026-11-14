/**
 * Итог одного вопроса.
 */
export type ResultStatus = 'correct' | 'empty' | 'wrong'

/**
 * Разобранный ответ после сдачи.
 */
export type ResultItem = {
  /**
   * Идентификатор вопроса.
   */
  id: string
  /**
   * Текст вопроса.
   */
  label: string
  /**
   * Верный, неверный или пустой ответ.
   */
  status: ResultStatus
}
