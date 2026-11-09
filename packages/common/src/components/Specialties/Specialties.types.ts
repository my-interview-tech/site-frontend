export type TechCard = {
  /**
   * Название.
   */
  title: string

  /**
   * Слаг страницы технологии.
   */
  slug: string

  /**
   * Подпись с числом вопросов.
   */
  count: string

  /**
   * Файл иконки в `static/src/icons` с расширением.
   */
  icon?: string

  /**
   * Метка на карточке. Сейчас только «Новая».
   */
  badge?: 'new'

  /**
   * Технология ещё не открыта.
   */
  isLocked?: boolean
}

export type Track = {
  /**
   * Идентификатор вкладки.
   */
  id: string

  /**
   * Подпись вкладки.
   */
  title: string

  /**
   * Технологии вкладки.
   */
  tech: TechCard[]
}

export type Specialty = {
  /**
   * Название.
   */
  title: string

  /**
   * Сводка по вопросам.
   */
  count: string

  /**
   * Технологии без вкладок или общий список.
   */
  tech: TechCard[]

  /**
   * Вкладки стека.
   */
  tracks?: Track[]

  /**
   * Специальность ещё не открыта.
   */
  isLocked?: boolean
}
