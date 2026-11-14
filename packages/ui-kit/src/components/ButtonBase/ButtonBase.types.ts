import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react'

export type ButtonBaseOwnProps = {
  /**
   * Содержимое.
   */
  children?: ReactNode

  /**
   * Кнопка недоступна.
   */
  disabled?: boolean

  /**
   * Идёт загрузка.
   */
  isLoading?: boolean
}

export type ButtonBaseProps<T extends ElementType = 'button'> = ButtonBaseOwnProps & {
  /** Тег или компонент. */
  as?: T
} & Omit<ComponentPropsWithoutRef<T>, keyof ButtonBaseOwnProps | 'as'>
