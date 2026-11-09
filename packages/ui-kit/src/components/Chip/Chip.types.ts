import type { ElementType, ReactNode } from 'react'

import type { ButtonBaseProps } from '../ButtonBase'

/** Визуальный режим чипа. */
export type ChipVariant = 'rect' | 'round'

/** Высота кнопки выбора в px. */
export type ChipSize = 32 | 40

export type ChipOwnProps = {
  /**
   * Подпись.
   */
  children: ReactNode

  /**
   * Чип выбран. Только для `round`.
   */
  isSelected?: boolean

  /**
   * Высота кнопки выбора в px.
   * @default 40
   */
  size?: ChipSize

  /**
   * `round` — капсула. `rect` — прямоугольная метка с рамкой акцента.
   * @default 'round'
   */
  variant?: ChipVariant
}

export type ChipProps<T extends ElementType = 'button'> = ChipOwnProps & Omit<ButtonBaseProps<T>, keyof ChipOwnProps>
