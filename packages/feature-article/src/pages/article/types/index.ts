import type { Article } from '@shared/model'

import type { Crumbs } from '@shared/types'

export type ArticleViewProps = {
  /**
   * Хлебные крошки по загруженной статье.
   */
  crumbs: (article: Article) => Crumbs['crumbs']
  /**
   * Идентификатор статьи.
   */
  id: string
  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void
  /**
   * Слаг технологии.
   */
  tech: string
}
