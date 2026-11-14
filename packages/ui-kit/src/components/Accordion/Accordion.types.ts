import type { ReactNode } from 'react'

import type { CellProps } from '../Cell'

export interface AccordionProps extends Omit<CellProps, 'isHoverable' | 'title'> {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Раскрыт ли аккордеон.
   */
  isOpen?: boolean

  /**
   * Клик по ячейке.
   */
  onToggle?: () => void

  /**
   * Раскрываемое содержимое.
   */
  children: ReactNode
}
