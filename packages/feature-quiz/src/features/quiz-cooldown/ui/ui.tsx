import { Flex, Text, theme } from '@my-interview/ui-kit'

import { waitOf } from '@quiz/shared/lib'

import { TEXT } from '../constants'
import type { QuizCooldownProps } from '../types'

/**
 * Ожидание, пока попытку нельзя начать.
 */
export const QuizCooldown = ({ title, wait }: QuizCooldownProps) => (
  <Flex flexDirection="column" gap={theme.spacings.s16}>
    <Text as="h1" color={theme.colors.textPrimary} font={900} weight="semibold">
      {title}
    </Text>
    <Text as="p" color={theme.colors.textSecondary} font={400}>
      {TEXT.AGAIN} {waitOf(wait)}.
    </Text>
  </Flex>
)
