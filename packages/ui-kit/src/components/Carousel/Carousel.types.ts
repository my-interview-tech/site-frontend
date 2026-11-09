import type { ReactNode } from 'react'

export type CarouselProps<T extends { id: string }> = {
  /**
   * Имя точки для скринридера по её номеру с нуля.
   * @default `Слайд ${index + 1}`
   */
  getDotLabel?: (index: number) => string

  /**
   * Интервал автопрокрутки, мс.
   * @default 5000
   */
  interval?: number

  /**
   * Карточки.
   */
  items: T[]

  /**
   * Отрисовка карточки.
   */
  renderItem: (item: T) => ReactNode

  /**
   * Сколько карточек видно.
   */
  visible: number
}
