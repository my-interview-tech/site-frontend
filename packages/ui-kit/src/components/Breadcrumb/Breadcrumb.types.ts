export interface Crumb {
  /**
   * Адрес перехода. Без него крошка — текущая страница.
   */
  href?: string

  /**
   * Текст.
   */
  label: string
}

export interface BreadcrumbProps {
  /**
   * Крошки от корня к текущей странице. У последней обычно нет `href`.
   */
  items: readonly Crumb[]
}
