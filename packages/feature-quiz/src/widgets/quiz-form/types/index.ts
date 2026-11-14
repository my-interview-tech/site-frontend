import type { QuizLoad, QuizRequest } from '@quiz/shared/model'

export type QuizFormProps = Pick<
  QuizLoad,
  'answers' | 'intro' | 'pages' | 'questionSeconds' | 'retryAt' | 'serverDate' | 'title'
> &
  QuizRequest & {
    onSolved?: (quiz: QuizRequest) => void
  }
