import type { EPageStatus } from '@my-interview/common'

import type { Article, ArticleRequest } from '@shared/model'

export type Props = ArticleRequest

type Reload = () => void

export type PageResponse =
  | {
      article: null
      pageStatus: typeof EPageStatus.ERROR | typeof EPageStatus.LOADING
      reload: Reload
    }
  | {
      article: Article
      pageStatus: typeof EPageStatus.SUCCESS
      reload: Reload
    }
