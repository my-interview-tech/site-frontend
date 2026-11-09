import type { FontWeight } from '@my-interview/ui-kit'

import type { NavLink } from '../../types'

export type MenuLinkProps = {
  /**
   * Начертание. Пункт верхнего уровня — `semibold`, ссылка группы — `regular`.
   */
  weight?: FontWeight
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
