import { Aside, Columns } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

import { QuizClock, QuizScore } from '@quiz/features/quiz-aside'
import { QuizCooldown } from '@quiz/features/quiz-cooldown'
import { QuizIntro } from '@quiz/features/quiz-intro'
import { QuizQuestion } from '@quiz/features/quiz-question'
import { QuizResult } from '@quiz/features/quiz-result'
import { QuizSteps } from '@quiz/features/quiz-steps'

import { useQuizSession } from '../hooks'
import type { QuizFormProps } from '../types'
import { Styled } from './styled'

/**
 * Многошаговая форма квиза.
 *
 * @description
 * До старта — описание или ожидание повтора. После старта — вопросы и таймер.
 * Смена шага и возврат к описанию отсчёт не сбрасывают.
 * Если общее время вышло, пустые ответы помечаются «Не ответил».
 */
export const QuizForm = ({
  answers,
  id,
  intro,
  onSolved,
  pages,
  questionSeconds,
  retryAt,
  serverDate,
  tech,
  title,
}: QuizFormProps) => {
  const session = useQuizSession({
    answers,
    id,
    intro,
    onSolved,
    pages,
    questionSeconds,
    retryAt,
    serverDate,
    tech,
    title,
  })
  const steps = (
    <QuizSteps
      missed={session.missed}
      pages={pages}
      reached={session.reached}
      result={session.result}
      review={session.reviewIndex}
      step={session.step}
      onOpen={session.openStep}
      onSummary={session.openSummary}
    />
  )
  let main = <QuizCooldown title={title} wait={session.wait} />

  if (session.phase === 'intro') {
    main = (
      <QuizIntro
        checks={intro.checks}
        isContinuation={session.started}
        isStarting={session.isStarting}
        questionCount={pages.length}
        title={title}
        totalSeconds={session.totalSeconds}
        onBegin={session.begin}
      />
    )
  }

  if (session.phase === 'question') {
    main = (
      <QuizQuestion
        canGoBack={session.canGoBack}
        choice={session.choice}
        description={session.description}
        error={session.error}
        footerLabel={session.footerLabel}
        navLabel={session.navLabel}
        steps={steps}
        title={title}
        value={session.value}
        onBack={session.back}
        onFinish={session.onFinish}
        onIntro={session.toIntro}
        onPrimary={session.onPrimary}
        onSelect={session.select}
      />
    )
  }

  if (session.phase === 'result' && session.result) {
    main = (
      <QuizResult
        correctCount={session.correctCount}
        emptyCount={session.emptyCount}
        passed={session.passed}
        result={session.result}
        review={session.review}
        steps={steps}
        wrongCount={session.wrongCount}
        onCloseReview={session.openSummary}
        onOpen={session.openReview}
        onRetry={session.retry}
      />
    )
  }

  if (!session.started) {
    return (
      <Columns align="start" gap={theme.spacings.s20} sidebar={240}>
        {main}
        <Aside />
      </Columns>
    )
  }

  if (session.result) {
    return (
      <Columns align="start" gap={theme.spacings.s20} sidebar={240}>
        <Styled.Main>{main}</Styled.Main>
        <Aside>
          <QuizScore correctCount={session.correctCount} total={session.result.length} />
        </Aside>
      </Columns>
    )
  }

  return (
    <Columns align="start" gap={theme.spacings.s20} sidebar={240}>
      {session.isOnIntro ? main : <Styled.Main>{main}</Styled.Main>}
      <Aside>
        <QuizClock left={session.left} />
      </Aside>
    </Columns>
  )
}
