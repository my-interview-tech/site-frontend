import type { NavLink } from '../../types'

export type MenuLinkProps = {
  font: 'navHeading' | 'navLink'
  link: NavLink
  onNavigate: () => void
  pathname: string
}

export type MenuProps = {
  /**
   * Шторка раскрыта.
   */
  isOpen: boolean

  /**
   * Закрыть шторку.
   */
  onClose: () => void
}
