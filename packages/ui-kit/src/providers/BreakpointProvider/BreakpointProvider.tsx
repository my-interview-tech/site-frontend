import { useMemo, useSyncExternalStore } from 'react'

import {
  BreakpointContext,
  getBreakpoint,
  getServerBreakpoint,
  subscribeBreakpoint,
  toBreakpointState,
} from './BreakpointProvider.lib'
import type { BreakpointProviderProps } from './BreakpointProvider.types'

/**
 * Текущий диапазон ширины для `useBreakpoint`. Одна подписка на `matchMedia` на всё приложение.
 * Вложен в `UiKitProvider`, отдельно не подключается.
 */
export const BreakpointProvider = ({ children }: BreakpointProviderProps) => {
  const breakpoint = useSyncExternalStore(subscribeBreakpoint, getBreakpoint, getServerBreakpoint)
  const state = useMemo(() => toBreakpointState(breakpoint), [breakpoint])

  return <BreakpointContext.Provider value={state}>{children}</BreakpointContext.Provider>
}
