export type ImageSource = {
  /**
   * Медиа-запрос, при котором берётся источник, например `(max-width: 768px)`.
   */
  media?: string

  /**
   * Адреса с дескрипторами, например `hero.avif 1x, hero@2x.avif 2x`.
   */
  srcSet: string

  /**
   * MIME-тип формата, например `image/avif` или `image/webp`.
   */
  type?: string
}

export type ImageProps = {
  /**
   * Адрес fallback-файла. Его берёт браузер, если ни один источник не подошёл.
   */
  src: string

  /**
   * Высота, px.
   */
  height: number

  /**
   * Ширина, px.
   */
  width: number

  /**
   * Альтернативный текст. Пустая строка — картинка декоративная.
   */
  alt: string

  /**
   * Источники для `<picture>` по порядку предпочтения. Без них рендерится обычный `<img>`.
   */
  sources?: ImageSource[]
}
