import type { ReactNode } from 'react'

import type { BreakpointsTypes } from '../../theme/types'

export type BreakpointProviderProps = {
  /**
   * Приложение, которому нужен `useBreakpoint`.
   */
  children: ReactNode
}

export interface BreakpointState {
  /**
   * Текущий диапазон ширины по шкале `withBreakpoints`.
   */
  breakpoint: BreakpointsTypes

  /**
   * Уже `tablet`: телефон.
   */
  isMobile: boolean

  /**
   * От `tablet` до `desktopXS`.
   */
  isTablet: boolean

  /**
   * От `desktopXS` и шире.
   */
  isDesktop: boolean
}
