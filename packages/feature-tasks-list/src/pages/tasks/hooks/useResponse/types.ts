import type { EPageStatus } from '@my-interview/common'

import type { TasksScreen } from '@tasks-list/shared/model'

type Reload = () => void

export type PageResponse =
  | {
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      reload: Reload
      screen: null
    }
  | {
      pageStatus: typeof EPageStatus.SUCCESS
      reload: Reload
      screen: TasksScreen
    }
