import type { ReactNode } from 'react'

export interface BottomSheetProps {
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
