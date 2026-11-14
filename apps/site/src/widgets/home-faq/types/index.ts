type FaqEntry = {
  /**
   * Идентификатор вопроса.
   * @type {string}
   */
  id: string

  /**
   * Формулировка вопроса.
   * @type {string}
   */
  question: string

  /**
   * Ответ.
   * @type {string | undefined}
   */
  answer?: string
}

export type FaqGroup = {
  /**
   * Идентификатор группы.
   * @type {string}
   */
  id: string

  /**
   * Название группы.
   * @type {string}
   */
  title: string

  /**
   * Вопросы группы.
   * @type {FaqEntry[]}
   */
  items: FaqEntry[]
}
