import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

/**
 * Закрывает открытый список по клику вне поля и по Escape.
 */
export const useSelect = (isOpen: boolean, onClose: () => void): RefObject<HTMLDivElement | null> => {
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) {
      return undefined
    }

    const onPointerDown = (event: PointerEvent) => {
      if (event.target instanceof Node && !rootRef.current?.contains(event.target)) {
        onClose()
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen, onClose])

  return rootRef
}
