import type { ComponentPropsWithoutRef } from 'react'

/** Куда повёрнута иконка. Исходник смотрит вправо. */
export type IconDirection = 'down' | 'left' | 'right' | 'up'

export type IconProps = Omit<ComponentPropsWithoutRef<'span'>, 'children' | 'color'> & {
  /**
   * Имя файла в `static/src/icons` без `.svg`, например `icon-chevron`.
   */
  iconSrc: string

  /**
   * Сторона квадрата в px.
   */
  size?: number

  /**
   * Цвет. Без значения берётся `currentColor` родителя.
   */
  color?: string

  /**
   * Поворот для направленных иконок вроде шеврона. Смена направления анимируется.
   */
  direction?: IconDirection
}
