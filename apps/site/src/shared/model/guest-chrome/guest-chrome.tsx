import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router'

import { featureToggles } from '@shared/config'
import { navBarPx, sectionOverlapPx } from '@shared/constants'

type NavScheme = 'on-hero' | 'on-surface'

type NavSurface = 'canvas' | 'hero' | 'page' | 'white'

type GuestChromeValue = {
  readonly navOffset: number
  readonly navScheme: NavScheme
  readonly navSurface: NavSurface
}

type NavDock = {
  readonly offset: number
  readonly surface: NavSurface
}

const isNavSurface = (value: string | undefined): value is NavSurface =>
  value === 'canvas' || value === 'hero' || value === 'page' || value === 'white'

const readNavSurface = (): NavSurface => {
  const line = navBarPx
  let surface: NavSurface = 'page'
  let surfaceTop = Number.NEGATIVE_INFINITY

  document.querySelectorAll<HTMLElement>('[data-nav-surface]').forEach((node) => {
    const { bottom, top } = node.getBoundingClientRect()
    const value = node.dataset.navSurface

    if (!isNavSurface(value) || bottom <= line || top > line || top < surfaceTop) {
      return
    }

    surfaceTop = top
    surface = value
  })

  return surface
}

const readNavDock = (scrollingDown: boolean): NavDock => {
  const sections = document.querySelectorAll<HTMLElement>('[data-snap-section]')

  if (sections.length === 0) {
    return { offset: 0, surface: readNavSurface() }
  }

  const limit = window.innerHeight - sectionOverlapPx
  let settled: NavSurface = 'hero'
  let settledTop = Number.NEGATIVE_INFINITY
  let incoming: NavSurface | null = null
  let incomingTop = Number.POSITIVE_INFINITY

  sections.forEach((node) => {
    const { top } = node.getBoundingClientRect()
    const value = node.dataset.navSurface

    if (!isNavSurface(value)) {
      return
    }

    if (top <= 0 && top >= settledTop) {
      settledTop = top
      settled = value
    }

    if (top > 0 && top < incomingTop) {
      incomingTop = top
      incoming = value
    }
  })

  if (scrollingDown && incoming && incoming !== 'hero' && incomingTop < limit) {
    return { offset: incomingTop, surface: incoming }
  }

  return { offset: 0, surface: settled }
}

const GuestChromeContext = createContext<GuestChromeValue | null>(null)

type GuestChromeProviderProps = {
  readonly children: ReactNode
}

const GuestChromeProvider = ({ children }: GuestChromeProviderProps) => {
  const { pathname } = useLocation()
  const [navDock, setNavDock] = useState<NavDock>({
    offset: 0,
    surface: featureToggles.main.carousel ? 'hero' : 'white',
  })

  useLayoutEffect(() => {
    setNavDock(readNavDock(false))
  }, [pathname])

  useEffect(() => {
    let frame = 0
    let previousY = window.scrollY
    let scrollingDown = false

    const update = () => {
      const nextY = window.scrollY

      scrollingDown = nextY > previousY
      previousY = nextY
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const next = readNavDock(scrollingDown)

        setNavDock((current) => (current.offset === next.offset && current.surface === next.surface ? current : next))
      })
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)

    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const value = useMemo<GuestChromeValue>(
    () => ({
      navOffset: navDock.offset,
      navScheme: navDock.surface === 'hero' ? 'on-hero' : 'on-surface',
      navSurface: navDock.surface,
    }),
    [navDock]
  )

  return <GuestChromeContext.Provider value={value}>{children}</GuestChromeContext.Provider>
}

const useGuestChrome = (): GuestChromeValue => {
  const value = useContext(GuestChromeContext)

  if (!value) {
    throw new Error('Guest chrome is unavailable')
  }

  return value
}

export { GuestChromeProvider, useGuestChrome }
