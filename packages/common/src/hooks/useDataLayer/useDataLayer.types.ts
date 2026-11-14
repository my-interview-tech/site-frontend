/** Путь и referrer на момент отправки. */
export type DataLayerContext = {
  screenName: string
  ref: string
}

/** Общие поля экрана и события, которые диспетчер отправляет один раз. */
export type UseDataLayerOptions<TEvent extends string, TData extends { event: string }> = {
  baseData?: Partial<TData>
  singleExecutedEventsList?: readonly TEvent[]
}

/** Локальное имя события и поля, которыми switcher дополняет объект. */
export type DataLayerDispatcher<TEvent extends string, TData extends { event: string }> = (
  event: TEvent,
  data?: Partial<TData>
) => void
