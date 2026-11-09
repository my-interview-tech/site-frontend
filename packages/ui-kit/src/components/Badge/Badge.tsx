import { Icon } from '../Icon'

import { Styled } from './Badge.styled'
import type { BadgeProps } from './Badge.types'

const ICON_SIZE = 14

/**
 * Бейдж: короткая подпись в цветной капсуле с иконкой слева или справа.
 */
export const Badge = ({ children, color = 'purple', iconSrc, iconPosition = 'left' }: BadgeProps) => {
  const icon = iconSrc !== undefined && <Icon iconSrc={iconSrc} size={ICON_SIZE} />

  return (
    <Styled.Component $color={color}>
      {iconPosition === 'left' && icon}
      {children}
      {iconPosition === 'right' && icon}
    </Styled.Component>
  )
}
