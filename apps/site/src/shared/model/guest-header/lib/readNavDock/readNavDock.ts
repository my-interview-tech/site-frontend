import { navBarPx, sectionOverlapPx } from '@shared/constants'

import type { NavDock, NavSurface } from '../../types'

export const isNavSurface = (value: string | undefined): value is NavSurface =>
  value === 'canvas' || value === 'hero' || value === 'page' || value === 'white'

export const readNavSurface = (): NavSurface => {
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

export const readNavDock = (scrollingDown: boolean): NavDock => {
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
