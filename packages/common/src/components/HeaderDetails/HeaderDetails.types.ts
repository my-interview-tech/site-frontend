export interface HeaderInterview {
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

export interface HeaderResult {
  /**
   * Подпись списка.
   */
  caption: string

  /**
   * Пункты.
   */
  items: string[]
}

export interface HeaderDetailsProps {
  /**
   * Связь с собеседованием.
   */
  interview: HeaderInterview

  /**
   * Вывод после изучения.
   */
  result?: HeaderResult
}
