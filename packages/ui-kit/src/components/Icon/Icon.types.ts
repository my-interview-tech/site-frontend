import type { ComponentPropsWithoutRef } from 'react'

/** Куда повёрнута иконка. Исходник смотрит вправо. */
export type IconDirection = 'down' | 'left' | 'right' | 'up'

export interface IconProps extends Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'color'> {
  /**
   * Имя файла в `static/src/icons` без `.svg`, например `icon-chevron`.
   */
  iconSrc: string

  /**
   * Сторона квадрата в px.
   */
  size?: number

  /**
   * Цвет монохромной маски. Без значения берётся `currentColor` родителя.
   */
  color?: string

  /**
   * Оставить только форму и красить её через `currentColor`. Иначе SVG сохраняет свои цвета.
   * @default false
   */
  isMonochrome?: boolean

  /**
   * Поворот для направленных иконок вроде шеврона. Смена направления анимируется.
   */
  direction?: IconDirection
}
