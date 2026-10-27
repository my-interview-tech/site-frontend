import { useTheme } from 'styled-components'

import { ArticleContent as Component } from '@widgets'
import { EPageStatus } from '@my-interview/common'
import { Breadcrumb, Flex } from '@my-interview/ui-kit'

import { useResponse } from '../hooks'

import type { ArticleViewProps } from '../types'
import { Error } from './Error'
import { Skeleton } from './Skeleton'

import { Styled } from './styled'

/**
 * Экран статьи.
 */
export const ArticleView = ({ crumbs: crumbsCallback, id, tech, onBack }: ArticleViewProps) => {
  const theme = useTheme()
  const { pageStatus, reload, article, crumbs } = useResponse({ crumbs: crumbsCallback, id, tech })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <Error onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS: {
        const { id: _articleId, ...content } = article

        return (
          <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
            <Breadcrumb items={crumbs} />
            <Component {...content} />
          </Flex>
        )
      }
      default:
        return null
    }
  })()

  return <Styled.Layout>{ScreenComponent}</Styled.Layout>
}
