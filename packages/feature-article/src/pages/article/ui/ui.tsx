import { ArticleContent as Component } from '@widgets'
import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { useResponse } from '../hooks'

import type { ArticleViewProps } from '../types'
import { Skeleton } from './Skeleton'

/**
 * Экран статьи.
 */
export const ArticleView = ({ id, nav, onBack, tech }: ArticleViewProps) => {
  const { pageStatus, reload, article } = useResponse({ id, tech })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS: {
        const { id: _articleId, ...content } = article

        return (
          <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
            {nav?.(article)}
            <Component {...content} />
          </Flex>
        )
      }
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
