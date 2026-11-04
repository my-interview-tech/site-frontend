import type { ReactNode } from 'react'

export type HomeSectionSurface = 'canvas' | 'white'

export type HomeSectionProps = {
  children: ReactNode
  /** Высота секции не меньше экрана. */
  fillViewport?: boolean
  /** Отступ между блоками секции. */
  gap?: number
  id?: string
  /** Фон и цвет шапки над секцией. */
  surface: HomeSectionSurface
}
