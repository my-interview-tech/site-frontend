import type { IconButtonSize } from './IconButton.types'

/** Сторона иконки в px для каждой стороны кнопки. */
export const ICON_SIZE = {
  32: 16,
  40: 16,
  48: 20,
} as const satisfies Record<IconButtonSize, number>
