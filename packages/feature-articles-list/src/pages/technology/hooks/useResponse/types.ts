import type { EPageStatus } from '@my-interview/common'

import type { TechnologyScreen } from '@articles-list/shared/model'

export type Props = {
  slug: string
}

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
      screen: TechnologyScreen
    }
