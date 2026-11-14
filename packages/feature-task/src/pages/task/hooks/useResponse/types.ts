import type { EPageStatus } from '@my-interview/common'

import type { Task } from '@task/shared/model'

export type Props = {
  id: string
  tech: string
}

type Reload = () => void

export type PageResponse =
  | {
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      reload: Reload
      task: null
    }
  | {
      pageStatus: typeof EPageStatus.SUCCESS
      reload: Reload
      task: Task
    }
