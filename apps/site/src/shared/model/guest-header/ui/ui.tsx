import { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { useLocation } from 'react-router'

import { featureToggles } from '@shared/config'

import { GuestHeaderContext } from '../hooks/useGuestHeader'
import { readNavDock } from '../lib'
import type { GuestHeaderProviderProps, GuestHeaderValue, NavDock } from '../types'

/**
 * Контекст шапки гостевого сайта: сдвиг и поверхность под ней.
 *
 * @description
 * Поверхность берётся из `data-nav-surface` секции `[data-snap-section]`, уже ушедшей за верх окна.
 * При прокрутке вниз, когда следующая секция не `hero` и её верх выше линии наезда, шапка едет с ней: `navOffset` равен этому верху.
 * Без таких секций поверхность читается по линии `navBarPx`. Смена маршрута сбрасывает сдвиг.
 */
export const GuestHeaderProvider = ({ children }: GuestHeaderProviderProps) => {
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

  const value = useMemo<GuestHeaderValue>(
    () => ({
      navOffset: navDock.offset,
      navScheme: navDock.surface === 'hero' ? 'on-hero' : 'on-surface',
      navSurface: navDock.surface,
    }),
    [navDock]
  )

  return <GuestHeaderContext.Provider value={value}>{children}</GuestHeaderContext.Provider>
}
