import type { ReactNode } from 'react'

/** `inline` — фрагмент в строке. `block` — блок с прокруткой. */
export type CodeVariant = 'inline' | 'block'

export interface CodeProps {
  /**
   * `inline` — фрагмент в строке. `block` — блок с прокруткой.
   * @default 'inline'
   */
  variant?: CodeVariant

  /**
   * Текст кода.
   */
  children: ReactNode
}
