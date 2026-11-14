import type { EPageStatus } from '@my-interview/common'

import type { QuizLoad, QuizRequest } from '@quiz/shared/model'

export type Props = QuizRequest

type Reload = () => void

export type PageResponse =
  | {
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      data: null
      reload: Reload
    }
  | {
      pageStatus: typeof EPageStatus.SUCCESS
      data: QuizLoad
      reload: Reload
    }
