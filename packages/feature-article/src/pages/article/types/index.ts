import type { ReactNode } from 'react'

import type { Article } from '@shared/model'

export type ArticleViewProps = {
  /**
   * Идентификатор статьи.
   */
  id: string
  /**
   * Узел над содержимым после загрузки. Хост передаёт крошки.
   */
  nav?: (article: Article) => ReactNode
  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void
  /**
   * Слаг технологии.
   */
  tech: string
}
