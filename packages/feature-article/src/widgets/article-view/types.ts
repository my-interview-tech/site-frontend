import type { Article } from '@shared/model'

type WithoutId<T> = T extends unknown ? Omit<T, 'id'> : never

export type ArticleContentProps = WithoutId<Article>
