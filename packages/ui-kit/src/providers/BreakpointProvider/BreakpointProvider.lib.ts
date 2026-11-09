import { createContext } from 'react'

import { breakpointKeys } from '../../lib/withBreakpoints'
import { theme } from '../../theme/theme'
import type { BreakpointsTypes } from '../../theme/types'

import type { BreakpointState } from './BreakpointProvider.types'

/** Без провайдера, например в unit-тестах фич, ширина считается десктопной. */
export const DEFAULT_BREAKPOINT: BreakpointsTypes = 'desktopS'

const QUERIES = breakpointKeys.map((key) => ({ key, query: `(min-width: ${theme.breakpoints[key]}px)` })).reverse()

const canMatch = (): boolean => typeof window !== 'undefined' && typeof window.matchMedia === 'function'

export const getBreakpoint = (): BreakpointsTypes => {
  if (!canMatch()) {
    return DEFAULT_BREAKPOINT
  }

  return QUERIES.find(({ query }) => window.matchMedia(query).matches)?.key ?? 'mobile'
}

export const getServerBreakpoint = (): BreakpointsTypes => DEFAULT_BREAKPOINT

export const subscribeBreakpoint = (onChange: () => void): (() => void) => {
  if (!canMatch()) {
    return () => undefined
  }

  const lists = QUERIES.map(({ query }) => window.matchMedia(query))

  lists.forEach((list) => list.addEventListener('change', onChange))

  return () => lists.forEach((list) => list.removeEventListener('change', onChange))
}

export const toBreakpointState = (breakpoint: BreakpointsTypes): BreakpointState => {
  const isMobile = breakpoint === 'mobile'
  const isTablet = breakpoint === 'tablet'

  return { breakpoint, isDesktop: !isMobile && !isTablet, isMobile, isTablet }
}

export const BreakpointContext = createContext<BreakpointState>(toBreakpointState(DEFAULT_BREAKPOINT))
