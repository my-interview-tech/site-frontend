import { css } from 'styled-components'

import { theme } from '../../theme/theme'
import type { BreakpointsTypes } from '../../theme/types'

/** Брейкпоинты, на которых компонент перекрывает мобильные стили. `mobile` — база без ключа. */
export const breakpointKeys = [
  'tablet',
  'desktopXS',
  'desktopS',
  'desktopM',
  'desktopL',
  'desktopXL',
] as const satisfies readonly Exclude<BreakpointsTypes, 'mobile'>[]

export type BreakpointKey = (typeof breakpointKeys)[number]

/** Стили без ключа действуют с 0px, ключ брейкпоинта перекрывает их с его ширины. */
export type WithBreakpoints<T> = T & Partial<Record<BreakpointKey, T>>

/** `@media (min-width)` для каждого заданного брейкпоинта, по возрастанию ширины. */
export const breakpointsCss = <T>(
  layout: WithBreakpoints<T>,
  render: (style: T) => ReturnType<typeof css> | string | null
): (ReturnType<typeof css> | null)[] =>
  breakpointKeys.map((breakpoint) => {
    const override = layout[breakpoint]

    if (!override) {
      return null
    }

    return css`
      @media (min-width: ${theme.breakpoints[breakpoint]}px) {
        ${render(override)}
      }
    `
  })
