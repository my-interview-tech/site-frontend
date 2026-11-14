import { Styled } from './Card.styled'
import type { CardProps } from './Card.types'

/**
 * Карточка: `Flex` на поверхности с рамкой и скруглением.
 */
export const Card = ({ as, radius = 16, ...rest }: CardProps) => (
  <Styled.Root {...rest} $radius={radius} forwardedAs={as} />
)
