import type { ElementType, ReactNode } from 'react'

import type { WithBreakpoints } from '../../lib/withBreakpoints'
import type { ButtonBaseProps } from '../ButtonBase'

export type ButtonVariant =
  /** Заливка акцентом. */
  | 'primary'
  /** Поверхность с рамкой. */
  | 'secondary'
  /** Стекло с бликом за курсором. */
  | 'glass'
  /** Стекло с бликом за курсором. */
  | 'ghost'
  /** Белая заливка и тёмный текст. */
  | 'inverse'
  /** Без фона и рамки. */
  | 'text'

/** Высота кнопки. */
export type ButtonSize = 32 | 40 | 48 | 56

/** Скругление. */
export type ButtonShape = 'rect' | 'round'

export type ButtonStyle = {
  /**
   * Высота.
   */
  size?: ButtonSize
}

export type ButtonLayout = WithBreakpoints<ButtonStyle>

export type ButtonOwnProps = ButtonLayout & {
  /**
   * Подпись.
   */
  children: ReactNode

  /**
   * Растянуть кнопку на всю ширину.
   */
  fullWidth?: boolean

  /**
   * Скругление.
   * @default 'rect'
   */
  shape?: ButtonShape

  /**
   * Режим оформления.
   * @default 'secondary'
   */
  variant?: ButtonVariant
}

export type ButtonProps<T extends ElementType = 'button'> = ButtonOwnProps &
  Omit<ButtonBaseProps<T>, keyof ButtonOwnProps>
