import { theme } from '@my-interview/ui-kit'

import { choiceOf } from '@quiz/shared/lib'

import { TEXT } from '../constants'
import type { QuizStepsProps } from '../types'
import { Styled } from './styled'

/**
 * Шаги квиза и переход к итогам.
 */
export const QuizSteps = ({ missed, onOpen, onSummary, pages, reached, result, review, step }: QuizStepsProps) => (
  <Styled.Steps relatively aria-label={TEXT.STEPS} flex={1} forwardedAs="nav" gap={theme.spacings.s8}>
    {pages.map((item, index) => {
      const isCurrent = result ? review === index : index === step
      const stepChoice = choiceOf(item)
      const stepResult = stepChoice ? result?.find((entry) => entry.id === stepChoice.id) : undefined
      const isMissed = !result && Boolean(stepChoice && missed.has(stepChoice.id))
      const isOpen = result ? true : index <= reached

      return (
        <Styled.Step
          key={stepChoice?.id ?? index}
          $current={isCurrent}
          $missed={isMissed}
          $open={isOpen}
          $tone={stepResult?.status}
          aria-current={isCurrent ? 'step' : undefined}
          aria-label={`${TEXT.STEP} ${index + 1}`}
          disabled={!isOpen}
          type="button"
          onClick={() => onOpen(index)}
        >
          {index + 1}
        </Styled.Step>
      )
    })}
    {result && (
      <Styled.SummaryStep
        $open
        $current={review === null}
        $missed={false}
        aria-current={review === null ? 'step' : undefined}
        aria-label={TEXT.SUMMARY}
        type="button"
        onClick={onSummary}
      >
        {TEXT.SUMMARY}
      </Styled.SummaryStep>
    )}
  </Styled.Steps>
)
