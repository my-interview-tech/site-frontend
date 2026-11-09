export interface SkeletonRectProps {
  /**
   * Высота. Число — px, строка как есть.
   */
  height: number | string

  /**
   * Ширина. Число — px, строка как есть. Без ширины блок занимает 100%.
   */
  width?: number | string

  /**
   * Радиус, px. Без него берётся `r8` темы.
   */
  radius?: number
}
