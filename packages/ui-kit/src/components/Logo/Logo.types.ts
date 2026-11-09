export type LogoProps = {
  /**
   * Словесный знак.
   */
  title: string

  /**
   * Файл знака, 24×24.
   */
  src: string

  /**
   * Адрес ссылки.
   */
  href?: string

  /**
   * Светлое название для тёмного или цветного фона, например героя. Иначе цветом текста темы.
   * @default false
   */
  isInverted?: boolean
}
