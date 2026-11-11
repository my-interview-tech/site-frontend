import type { ReactNode } from 'react'

/** Цветовая схема шапки. */
export type NavScheme = 'on-hero' | 'on-surface'

/** Значение `data-nav-surface` у секции. */
export type NavSurface = 'canvas' | 'hero' | 'page' | 'white'

export type GuestHeaderValue = {
  /** Сдвиг шапки вниз, px. `0`, когда секция не подъезжает. */
  navOffset: number
  /** `on-hero` на поверхности `hero`, иначе `on-surface`. */
  navScheme: NavScheme
  /** Поверхность секции под шапкой. */
  navSurface: NavSurface
}

export type NavDock = {
  offset: number
  surface: NavSurface
}

export type GuestHeaderProviderProps = {
  children: ReactNode
}
