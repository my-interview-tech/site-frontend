import { Styled } from './SkeletonRect.styled'
import type { SkeletonRectProps } from './SkeletonRect.types'

/**
 * Прямоугольник-заглушка фиксированного размера.
 */
export const SkeletonRect = ({ height, radius, width }: SkeletonRectProps) => (
  <Styled.Skeleton $height={height} $radius={radius} $width={width} />
)
