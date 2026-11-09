import type { ElementType } from 'react'

import type { TextProps } from '@my-interview/ui-kit'

/**
 * По умолчанию тег `h2`, кегль 700, `semibold`, цвет `textPrimary`.
 * Явный `id` важнее якоря `{#id}` из текста.
 */
export type AnchorHeadingProps<T extends ElementType = 'h2'> = TextProps<T>
