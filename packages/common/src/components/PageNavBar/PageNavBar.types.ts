import type { ReactNode } from 'react'

import type { Crumb } from '@my-interview/ui-kit'

export interface PageNavBarProps {
  /**
   * Шаги слева направо.
   */
  crumbs: Crumb[]

  /**
   * Содержимое под крошками.
   */
  children: ReactNode
}
