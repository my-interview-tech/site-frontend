import { Flex, Text, theme } from '@my-interview/ui-kit'

import { SCALE } from '../../constants'
import { getFilledCount } from '../../lib'
import type { ScaleMarksProps } from '../../types'
import { Styled } from '../styled'

const MARKS = Array.from({ length: SCALE }, (_, index) => index)

/**
 * Шкала из делений: важность или сложность навыка.
 */
export const ScaleMarks = ({ label, value }: ScaleMarksProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const filled = getFilledCount(value)

  return (
    <Flex alignItems="center" gap={theme.spacings.s8}>
      <Text as="span" color={theme.colors.textSecondary} font={400}>
        {label}
      </Text>
      <Flex inline aria-label={`${label} ${value}`} gap={theme.spacings.s4} role="img">
        {MARKS.map((mark) => (
          <Styled.Tick key={mark} $isOn={mark < filled} />
        ))}
      </Flex>
    </Flex>
  )
}
