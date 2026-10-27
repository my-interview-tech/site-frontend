import type { EPageStatus } from '@my-interview/common'
import type { Crumb } from '@my-interview/ui-kit'

import type { TechnologyScreen } from '@articles-list/shared/model'

export type Props = {
  crumbs: (screen: TechnologyScreen) => Crumb[]
  slug: string
}

type Reload = () => void

export type PageResponse =
  | {
      crumbs: []
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      reload: Reload
      screen: null
    }
  | {
      crumbs: Crumb[]
      pageStatus: typeof EPageStatus.SUCCESS
      reload: Reload
      screen: TechnologyScreen
    }
