import { useEffect, useRef, useState } from 'react'

import { LOCALE_KEY, readLocale, type Locale } from '../../lib'
import type { LocaleState, Panel } from './types'

/**
 * Хук для управления состоянием панели языка и языка сайта.
 */
export const useLocale = (): LocaleState => {
  const [panel, setPanel] = useState<Panel>(null)
  const [locale, setLocale] = useState<Locale>(readLocale)
  const clusterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!panel) {
      return undefined
    }

    const onPointer = (event: MouseEvent) => {
      const { target } = event

      if (target instanceof Node && clusterRef.current?.contains(target)) {
        return
      }

      setPanel(null)
    }

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPanel(null)
      }
    }

    document.addEventListener('mousedown', onPointer)
    document.addEventListener('keydown', onKey)

    return () => {
      document.removeEventListener('mousedown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [panel])

  const chooseLocale = (next: Locale) => {
    window.localStorage.setItem(LOCALE_KEY, next)
    setLocale(next)
    setPanel(null)
  }

  const togglePanel = (next: 'lang') => {
    setPanel((current) => (current === next ? null : next))
  }

  return {
    panel,
    clusterRef,
    togglePanel,
    locale,
    chooseLocale,
  }
}
