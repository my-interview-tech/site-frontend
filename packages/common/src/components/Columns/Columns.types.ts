import type { CSSProperties, ReactNode } from 'react'

export type ColumnsProps = {
  /**
   * Выравнивание колонок по поперечной оси.
   * @default 'stretch'
   */
  align?: CSSProperties['alignItems']

  /**
   * Зазор между колонками, px.
   */
  gap: number

  /**
   * Ширина правой колонки, px.
   */
  sidebar: number

  /**
   * Сначала основная колонка, затем сайдбар.
   */
  children: ReactNode
}
