import type { ReactNode } from 'react'

export type BottomSheetProps = {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Подзаголовок.
   */
  subtitle?: string

  /**
   * Шторка открыта.
   */
  isOpen: boolean

  /**
   * Событие "закрыть".
   */
  onClose: () => void

  /**
   * Содержимое.
   */
  children: ReactNode
}
