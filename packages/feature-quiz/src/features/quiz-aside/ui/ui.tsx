import { Text, theme } from '@my-interview/ui-kit'

import { clockOf } from '@quiz/shared/lib'

import { TEXT } from '../constants'
import type { QuizClockProps, QuizScoreProps } from '../types'
import { Styled } from './styled'

/**
 * Сколько секунд осталось на попытку.
 */
export const QuizClock = ({ left }: QuizClockProps) => (
  <Styled.Card flexDirection="column" forwardedAs="section" gap={theme.spacings.s8} p={theme.spacings.s16}>
    <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
      {TEXT.LEFT}
    </Text>
    <Styled.Clock>{clockOf(left)}</Styled.Clock>
  </Styled.Card>
)

/**
 * Сколько ответов верные.
 */
export const QuizScore = ({ correctCount, total }: QuizScoreProps) => (
  <Styled.Card flexDirection="column" forwardedAs="section" gap={theme.spacings.s8} p={theme.spacings.s16}>
    <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
      {TEXT.RIGHT_LABEL}
    </Text>
    <Styled.Clock>
      {correctCount} {TEXT.OF} {total}
    </Styled.Clock>
  </Styled.Card>
)
