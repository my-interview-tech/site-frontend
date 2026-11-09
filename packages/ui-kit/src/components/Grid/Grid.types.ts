import type { ComponentPropsWithoutRef, ReactElement, ReactNode } from 'react'

export interface GridItemProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Содержимое ячейки.
   */
  children: ReactNode

  /**
   * Сколько колонок занимает блок с планшета. На мобильном ячейка всегда на всю ширину.
   */
  size?: number
}

export interface GridProps extends ComponentPropsWithoutRef<'div'> {
  /**
   * Ячейки сетки.
   */
  children: ReactElement<GridItemProps> | ReactElement<GridItemProps>[]
}
