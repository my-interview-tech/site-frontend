import { IconButton } from '../IconButton'

import { Styled } from './IndicatorButton.styled'
import type { IndicatorButtonProps } from './IndicatorButton.types'

/**
 * Круглая кнопка с иконкой и счётчиком в углу.
 *
 * @description
 * - Счётчик виден, только когда `counter` больше нуля.
 * - `className` попадает на обёртку, поэтому `styled(IndicatorButton)` позиционирует кнопку вместе со счётчиком.
 */
export const IndicatorButton = ({ className, counter, ...rest }: IndicatorButtonProps) => (
  <Styled.Root className={className}>
    <IconButton {...rest} />
    {Boolean(counter) && <Styled.Counter aria-hidden>{counter}</Styled.Counter>}
  </Styled.Root>
)
