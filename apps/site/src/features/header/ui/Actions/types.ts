export type ActionsProps = {
  /**
   * Меню раскрыто.
   */
  isMenuOpen: boolean

  /**
   * Открыть или закрыть меню.
   */
  onToggleMenu: () => void

  /**
   * Фон полосы. На герое знаки светлые.
   */
  scheme: 'on-hero' | 'on-surface'
}
