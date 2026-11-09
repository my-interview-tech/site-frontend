import type { ReactNode } from 'react'

import type { Crumb } from '@my-interview/ui-kit'

export type PageNavBarProps = {
  /**
   * Шаги слева направо.
   */
  crumbs: Crumb[]

  /**
   * Содержимое под крошками.
   */
  children: ReactNode
}
