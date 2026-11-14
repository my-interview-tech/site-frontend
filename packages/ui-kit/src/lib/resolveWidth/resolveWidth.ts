import { isNumber } from '../isNumber'

/**
 * Число переводит в px, строку и `undefined` возвращает как есть.
 */
export const toPx = (value?: number | string): string | undefined => (isNumber(value) ? `${value}px` : value)

/**
 * Ширина блока: явная `width` важнее `fillWidth`, без обоих — `unset`.
 */
export const resolveWidth = (fillWidth?: boolean, width?: number | string): string | undefined => {
  if (width !== undefined) {
    return toPx(width)
  }

  if (fillWidth) {
    return '100%'
  }

  return 'unset'
}
