import type { IconButtonProps } from '../IconButton'

export type IndicatorButtonProps = Omit<IconButtonProps, 'as'> & {
  /**
   * Число в правом верхнем углу. `0` и пустое значение счётчик не показывают.
   */
  counter?: number
}
