import { ArticleContent as Component } from '@widgets'
import { EPageStatus, ErrorState, PageContainer, PageNavBar } from '@my-interview/common'

import { useResponse } from '../hooks'

import type { ArticleViewProps } from '../types'
import { Skeleton } from './Skeleton'

/**
 * Экран статьи.
 */
export const ArticleView = ({ crumbs: crumbsCallback, id, tech, onBack }: ArticleViewProps) => {
  const { pageStatus, reload, article, crumbs } = useResponse({ crumbs: crumbsCallback, id, tech })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS: {
        const { id: _articleId, ...content } = article

        return (
          <PageNavBar crumbs={crumbs}>
            <Component {...content} />
          </PageNavBar>
        )
      }
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
