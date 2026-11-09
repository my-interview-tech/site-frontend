import type { ReactNode } from 'react'

/** Цвет бейджа. */
export type BadgeColor =
  | 'blueOutline'
  | 'gray'
  | 'grayOutline'
  | 'green'
  | 'orange'
  | 'purple'
  | 'purpleOutline'
  | 'redOutline'

/** Сторона иконки относительно текста. */
export type BadgeIconPosition = 'left' | 'right'

export interface BadgeProps {
  /**
   * Текст бейджа.
   */
  children: ReactNode

  /**
   * Цвет.
   * @default `purple`
   */
  color?: BadgeColor

  /**
   * Иконка из `static/src/icons`, имя файла без `.svg`.
   */
  iconSrc?: string

  /**
   * Сторона иконки.
   * @default `left`
   */
  iconPosition?: BadgeIconPosition
}
