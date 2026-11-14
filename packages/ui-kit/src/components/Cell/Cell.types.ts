import type { ReactNode } from 'react'

import type { BadgeProps } from '../Badge'

export interface CellProps {
  /**
   * Заголовок.
   */
  title?: ReactNode

  /**
   * Подзаголовок.
   */
  subtitle?: ReactNode

  /**
   * Подзаголовок над заголовком, а не под ним.
   * @default false
   */
  isReversed?: boolean

  /**
   * Центральная часть вместо `Title` из `title` и `subtitle`.
   */
  slotCenter?: ReactNode

  /**
   * Слот продукта слева.
   */
  slotBefore?: ReactNode

  /**
   * Слот продукта справа.
   */
  slotAfter?: ReactNode

  /**
   * Один бейдж перед `slotAfter`.
   */
  badge?: BadgeProps

  /**
   * Подсветка при наведении.
   * @default false
   */
  isHoverable?: boolean
}
