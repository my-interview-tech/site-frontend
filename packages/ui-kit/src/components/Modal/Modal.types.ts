import type { ReactNode } from 'react'

export interface ModalProps {
  /**
   * Заголовок.
   */
  title: string

  /**
   * Подзаголовок.
   */
  subtitle?: string

  /**
   * Окно открыто.
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

  /**
   * Действие внизу окна: кнопка или ссылка.
   */
  action?: ReactNode
}
