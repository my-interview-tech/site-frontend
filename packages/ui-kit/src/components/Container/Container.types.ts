import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type ContainerProps = ComponentPropsWithoutRef<'div'> & {
  /**
   * Содержимое страницы.
   */
  children: ReactNode
}
