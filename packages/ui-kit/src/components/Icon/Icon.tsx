import { DEFAULT_ICON_SIZE, ICON_ROTATION, ICONS_URL } from './Icon.constants'
import { Styled } from './Icon.styled'
import type { IconProps } from './Icon.types'

/**
 * Иконка из `static/src/icons`.
 * @description Рисуется CSS-маской: из SVG берётся только форма, цвет — `color` или `currentColor`.
 * Многоцветные картинки рисуются через `Image`.
 * Без `aria-label` скрыта от скринридеров. С ним получает `role="img"`.
 */
export const Icon = ({ color, direction = 'right', iconSrc, size = DEFAULT_ICON_SIZE, ...rest }: IconProps) => {
  const isLabelled = Boolean(rest['aria-label'])

  return (
    <Styled.Component
      $color={color}
      $rotation={ICON_ROTATION[direction]}
      $size={size}
      $src={`${ICONS_URL}/${iconSrc}.svg`}
      aria-hidden={isLabelled ? undefined : true}
      role={isLabelled ? 'img' : undefined}
      {...rest}
    />
  )
}
