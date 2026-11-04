export type SiteHeaderState = {
  /**
   * Меню раскрыто.
   */
  isMenuOpen: boolean

  /**
   * Закрыть меню.
   */
  closeMenu: () => void

  /**
   * Открыть или закрыть меню.
   */
  toggleMenu: () => void
}
