import { Button, Flex, Text, theme } from '@my-interview/ui-kit'

import { TEXT } from '../constants'
import { markOf } from '../lib'
import type { QuizResultProps } from '../types'
import { Styled } from './styled'

/**
 * Итог попытки и разбор ответов.
 */
export const QuizResult = ({
  correctCount,
  emptyCount,
  onCloseReview,
  onOpen,
  onRetry,
  passed,
  result,
  review,
  steps,
  wrongCount,
}: QuizResultProps) => (
  <Styled.Form flexDirection="column" forwardedAs="div" gap={theme.spacings.s24}>
    {steps}
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <Text as="h1" color={theme.colors.textPrimary} font={900} weight="semibold">
        {passed ? TEXT.PASSED : TEXT.ERRORS}
      </Text>
      <Text as="p" color={theme.colors.textSecondary} font={400}>
        {correctCount} {TEXT.OF} {result.length} {TEXT.RIGHT}
      </Text>
    </Flex>
    <Flex alignItems="center" flexWrap="wrap" gap={theme.spacings.s8}>
      <Styled.Fact>
        {correctCount} {TEXT.CORRECT}
      </Styled.Fact>
      <Styled.Fact>
        {wrongCount} {TEXT.WRONG}
      </Styled.Fact>
      <Styled.Fact>
        {emptyCount} {TEXT.EMPTY}
      </Styled.Fact>
    </Flex>
    {review ? (
      <Flex flexDirection="column" gap={theme.spacings.s12}>
        <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
          {TEXT.STEP} {review.stepNumber} {TEXT.OF} {review.pagesCount}
        </Text>
        <Text as="h2" color={theme.colors.textPrimary} font={700} weight="semibold">
          {review.question}
        </Text>
        <Styled.Picked
          $status={review.status}
          alignItems="center"
          gap={theme.spacings.s12}
          justifyContent="space-between"
        >
          {review.answer ? <span>{review.answer}</span> : <span>{TEXT.EMPTY_ANSWER}</span>}
          <Styled.Mark $status={review.status}>{markOf(review.status)}</Styled.Mark>
        </Styled.Picked>
        <Button type="button" variant="text" onClick={onCloseReview}>
          {TEXT.REVIEW}
        </Button>
      </Flex>
    ) : (
      <Flex flexDirection="column" gap={theme.spacings.s12}>
        {result.map((item) => (
          <Styled.BreakdownRow
            key={item.id}
            alignItems="baseline"
            forwardedAs="button"
            gap={theme.spacings.s12}
            justifyContent="space-between"
            type="button"
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            onClick={() => onOpen(item.id)}
          >
            <Text as="span" color={theme.colors.textPrimary} font={400}>
              {item.label}
            </Text>
            <Styled.Mark $status={item.status}>{markOf(item.status)}</Styled.Mark>
          </Styled.BreakdownRow>
        ))}
      </Flex>
    )}
    {!passed && (
      <Button fullWidth type="button" variant="primary" onClick={onRetry}>
        {TEXT.RETRY}
      </Button>
    )}
  </Styled.Form>
)
