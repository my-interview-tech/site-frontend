import { useLayoutEffect, useState } from 'react'

import type { SiteHeaderState } from './types'

const scrollbarGap = '--guest-scrollbar-gap'

/**
 * Хук для управления состоянием меню шапки сайта и замок прокрутки страницы, пока оно открыто.
 */
export const useSiteHeader = (): SiteHeaderState => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useLayoutEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const gap = window.innerWidth - document.documentElement.clientWidth
    const previousOverflow = document.body.style.overflow

    document.documentElement.style.setProperty(scrollbarGap, `${gap}px`)
    document.body.dataset.navMenu = 'open'
    document.body.style.overflow = 'hidden'

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.documentElement.style.removeProperty(scrollbarGap)
      delete document.body.dataset.navMenu
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [isMenuOpen])

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const toggleMenu = () => {
    setIsMenuOpen((open) => !open)
  }

  return {
    isMenuOpen,
    closeMenu,
    toggleMenu,
  }
}
