import { useContext } from 'react'

import { BreakpointContext } from '../../providers/BreakpointProvider'
import type { BreakpointState } from '../../providers/BreakpointProvider'

/**
 * Текущий диапазон ширины по шкале `withBreakpoints`: `mobile` < 768 ≤ `tablet` < 960 ≤ `desktopXS`…
 * Без `UiKitProvider` отдаёт `desktopS`.
 */
export const useBreakpoint = (): BreakpointState => useContext(BreakpointContext)
