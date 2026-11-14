import type { ReactNode } from 'react'

import type { TypographyStep } from '../../theme/typography'

/** Шаг шкалы кеглей для заголовка. Кегль подзаголовка выводится из него. */
export type TitleSize = Extract<TypographyStep, 400 | 500 | 600 | 700 | 800 | 900>

/** Тег заголовка. */
export type TitleTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'

export interface TitleProps {
  /**
   * Заголовок.
   */
  title: ReactNode

  /**
   * Тег заголовка.
   * @default `span`
   */
  titleAs?: TitleTag

  /**
   * Подзаголовок.
   */
  subtitle?: ReactNode

  /**
   * Шаг шкалы кеглей заголовка.
   * @default 500
   */
  size?: TitleSize

  /**
   * Подзаголовок над заголовком, а не под ним.
   * @default false
   */
  isReversed?: boolean

  /**
   * Действие справа: кнопка или ссылка.
   */
  action?: ReactNode
}
