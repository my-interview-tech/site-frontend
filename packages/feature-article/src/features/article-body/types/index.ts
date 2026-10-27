import type { ReactNode } from 'react'

import type { ArticleBody as ArticleBodyData } from '@shared/model'

export type ArticleBodyProps = ArticleBodyData & {
  /**
   * Блок оффера.
   */
  paywall?: ReactNode
}
