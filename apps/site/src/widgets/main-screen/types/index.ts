export type HeroSlide = {
  /**
   * Заголовок.
   * @type {string}
   */
  title: string

  /**
   * Подзаголовок.
   * @type {string}
   */
  subTitle: string

  /**
   * Файл иллюстрации.
   * @type {string}
   */
  image: string

  /**
   * Текст иллюстрации, если файл не загрузился.
   * @type {string}
   */
  imageAlt: string

  /**
   * Адрес кнопки.
   * @type {string}
   */
  ctaHref?: string

  /**
   * Подпись кнопки.
   * @type {string}
   */
  cta: string

  /**
   * Подписи шагов под слайдом.
   * @type {string[]}
   */
  steps: string[]
}
