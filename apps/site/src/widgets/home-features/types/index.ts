export type Feature = {
  /**
   * Текст метки.
   * @type {string}
   */
  badge: string

  /**
   * Описание.
   * @type {string}
   */
  body: string

  /**
   * Файл иллюстрации в `guest`.
   * @type {string}
   */
  image: string

  /**
   * Текст, если файл не загрузился.
   * @type {string}
   */
  imageAlt: string

  /**
   * Картинка слева от текста.
   * @type {boolean}
   */
  imageFirst: boolean

  /**
   * Заголовок блока.
   * @type {string}
   */
  title: string
}
