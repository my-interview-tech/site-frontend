import { Text } from '../Text'
import { getIndicatorPlate } from './Indicator.lib'
import { Styled } from './Indicator.styled'
import type { IndicatorProps } from './Indicator.types'

/**
 * Оценка сложности от 1 до 10 в цветной плашке.
 */
export const Indicator = ({ value }: IndicatorProps) => {
  const { background, color } = getIndicatorPlate(value)

  return (
    <Styled.Mark
      inline
      $background={background}
      alignItems="center"
      aria-label={`Сложность ${value}`}
      flexShrink={0}
      forwardedAs="span"
      justifyContent="center"
      role="img"
    >
      <Text color={color} font={value >= 10 ? 300 : 400} tracking="tight" weight="bold">
        {value}
      </Text>
    </Styled.Mark>
  )
}
