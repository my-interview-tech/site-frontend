import type { ElementType } from 'react'

import type { ButtonBaseProps } from '../ButtonBase'
import type { IconDirection } from '../Icon'

/** Сторона кнопки в px. */
export type IconButtonSize = 32 | 40 | 48

/**
 * Вид кнопки. Имена совпадают с `Button`:
 * - `secondary` — поверхность с рамкой;
 * - `glass` — стекло на поверхности, блик за курсором;
 * - `ghost` — стекло на фоне героя, светлая иконка;
 * - `text` — без фона и рамки, как `text` у `Button`.
 */
export type IconButtonVariant = 'ghost' | 'glass' | 'secondary' | 'text'

export type IconButtonOwnProps = {
  /**
   * Имя кнопки для скринридера: у кнопки нет текста.
   */
  label: string

  /**
   * Сторона в px.
   * @default 40
   */
  size?: IconButtonSize

  /**
   * Вид кнопки.
   * @default 'secondary'
   */
  variant?: IconButtonVariant

  /**
   * Имя файла в `static/src/icons` без `.svg`, например `icon-cross`.
   */
  iconSrc: string

  /**
   * Поворот направленной иконки, как `direction` у `Icon`.
   * @default 'right'
   */
  iconDirection?: IconDirection

  /**
   * Раскрыто связанное содержимое: ставит `aria-expanded`, кнопка выглядит как при ховере.
   */
  isOpen?: boolean
}

export type IconButtonProps<T extends ElementType = 'button'> = IconButtonOwnProps &
  Omit<ButtonBaseProps<T>, keyof IconButtonOwnProps | 'children'>
