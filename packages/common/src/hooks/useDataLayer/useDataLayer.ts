import { useCallback, useRef } from 'react'

import { reachGoal } from '../../lib/analytics'
import type { DataLayerContext, DataLayerDispatcher, UseDataLayerOptions } from './useDataLayer.types'

const readContext = (): DataLayerContext => {
  if (typeof window === 'undefined') {
    return { screenName: '', ref: '' }
  }

  return {
    screenName: `${window.location.pathname}${window.location.search}`,
    ref: document.referrer,
  }
}

const mergePayload = <TData extends { event: string }>(
  context: DataLayerContext,
  baseData: Partial<TData> | undefined,
  data: Partial<TData> | undefined
): Partial<TData> & DataLayerContext =>
  ({
    ...context,
    ...baseData,
    ...data,
  }) as Partial<TData> & DataLayerContext

/**
 * События Метрики: switcher собирает объект, диспетчер отправляет его целью.
 * @description Switcher — функция модуля. `undefined` и пустой `event` не отправляются.
 * Событие из `singleExecutedEventsList` уходит один раз за жизнь хука.
 */
export const useDataLayer = <TEvent extends string, TData extends { event: string }>(
  switcher: (event: TEvent, data: Partial<TData> & DataLayerContext) => TData | undefined,
  options?: UseDataLayerOptions<TEvent, TData>
): { dataLayerDispatcher: DataLayerDispatcher<TEvent, TData> } => {
  const optionsRef = useRef(options)
  const executedRef = useRef<TEvent[]>([])

  optionsRef.current = options

  const dataLayerDispatcher = useCallback(
    (event: TEvent, data?: Partial<TData>): void => {
      const once = optionsRef.current?.singleExecutedEventsList

      if (once?.includes(event)) {
        if (executedRef.current.includes(event)) {
          return
        }

        executedRef.current.push(event)
      }

      const payload = switcher(event, mergePayload(readContext(), optionsRef.current?.baseData, data))

      if (!payload?.event) {
        return
      }

      reachGoal(payload.event, payload)
    },
    [switcher]
  )

  return { dataLayerDispatcher }
}
