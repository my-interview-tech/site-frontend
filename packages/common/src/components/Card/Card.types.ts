import type { FlexProps } from '@my-interview/ui-kit'

/** Радиус скругления в px. */
export type CardRadius = 10 | 12 | 16

export interface CardProps extends FlexProps {
  /**
   * Радиус скругления в px.
   * @default 16
   */
  radius?: CardRadius
}
