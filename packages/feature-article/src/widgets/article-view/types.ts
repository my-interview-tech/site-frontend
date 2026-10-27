import type { Article } from '@shared/model'

import type { Crumbs } from '@shared/types'

type WithoutId<T> = T extends unknown ? Omit<T, 'id'> : never

export type ArticleContentProps = Crumbs & WithoutId<Article>
