export type HeaderInterview = {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Подпись над заголовком.
   */
  caption: string

  /**
   * Тело описания.
   */
  body?: string
}

export type HeaderResult = {
  /**
   * Подпись списка.
   */
  caption: string

  /**
   * Пункты.
   */
  items: string[]
}

export type HeaderDetailsProps = {
  /**
   * Связь с собеседованием.
   */
  interview: HeaderInterview

  /**
   * Вывод после изучения.
   */
  result?: HeaderResult
}
