import type { EPageStatus } from '@my-interview/common'
import type { Crumb } from '@my-interview/ui-kit'

import type { Article, ArticleRequest } from '@shared/model'

export type Props = ArticleRequest & {
  crumbs: (article: Article) => Crumb[]
}

type Reload = () => void

export type PageResponse =
  | {
      article: null
      crumbs: []
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      reload: Reload
    }
  | {
      article: Article
      crumbs: Crumb[]
      pageStatus: typeof EPageStatus.SUCCESS
      reload: Reload
    }
