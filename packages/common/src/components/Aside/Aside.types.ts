import type { CSSProperties, ReactNode } from 'react'

export interface AsideProps {
  /**
   * Выравнивание колонки в сетке родителя.
   */
  alignSelf?: CSSProperties['alignSelf']

  /**
   * Контент.
   */
  children?: ReactNode
}
