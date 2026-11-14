import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Поведение открытого окна: блокирует скролл, ставит фокус в окно, закрывает по Escape и возвращает фокус.
 */
export const useModal = (isOpen: boolean, onClose: () => void): RefObject<HTMLDivElement | null> => {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const { overflow } = document.body.style
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.body.style.overflow = 'hidden'
    panelRef.current?.focus()
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = overflow
      window.removeEventListener('keydown', onKeyDown)
      previousFocus?.focus()
    }
  }, [isOpen, onClose])

  return panelRef
}
