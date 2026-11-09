import type { ReactNode } from 'react'

/** Вкладка. */
export interface TabsItem<T extends string = string> {
  /**
   * Ключ вкладки.
   */
  id: T

  /**
   * Подпись.
   */
  label: ReactNode
}

export interface TabsProps<T extends string = string> {
  /**
   * Вкладки в порядке показа.
   */
  items: readonly TabsItem<T>[]

  /**
   * Ключ выбранной вкладки.
   */
  value: T

  /**
   * Событие "выбрать вкладку".
   */
  onChange: (id: T) => void

  /**
   * Имя группы для скринридера.
   */
  label: string
}
