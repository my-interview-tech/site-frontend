import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

import { useBreakpoint } from '../../hooks/useBreakpoint'

/**
 * Хук для управления поведением открытой шторки на узком экране.
 */
export const useBottomSheet = (isOpen: boolean, onClose: () => void): RefObject<HTMLDivElement | null> => {
  const panelRef = useRef<HTMLDivElement>(null)
  const { isMobile } = useBreakpoint()
  const isActive = isOpen && isMobile

  useEffect(() => {
    if (!isActive) {
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
  }, [isActive, onClose])

  return panelRef
}
