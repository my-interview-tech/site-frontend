import { DEFAULT_ICON_SIZE, ICON_ROTATION, ICONS_URL } from './Icon.constants'
import { Styled } from './Icon.styled'
import type { IconProps } from './Icon.types'

/**
 * SVG из реестра `static/src/icons`.
 *
 * @description
 * - По умолчанию сохраняет цвета файла.
 * - `isMonochrome` оставляет форму и красит её через `currentColor` или `color`.
 * - Без `aria-label` скрыта от скринридеров. С ним получает `role="img"`.
 */
export const Icon = ({
  color,
  direction = 'right',
  iconSrc,
  isMonochrome = false,
  size = DEFAULT_ICON_SIZE,
  ...rest
}: IconProps) => {
  const isLabelled = Boolean(rest['aria-label'])

  return (
    <Styled.Component
      $color={color}
      $isMonochrome={isMonochrome}
      $rotation={ICON_ROTATION[direction]}
      $size={size}
      $src={`${ICONS_URL}/${iconSrc}.svg`}
      aria-hidden={isLabelled ? undefined : true}
      role={isLabelled ? 'img' : undefined}
      {...rest}
    />
  )
}
