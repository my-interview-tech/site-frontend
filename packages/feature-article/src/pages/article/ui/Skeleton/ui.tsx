import { useTheme } from 'styled-components'

import {
  ArticleAdSkeleton,
  ArticleBodySkeleton,
  ArticleHeaderSkeleton,
  ArticleSkillsSkeleton,
  ArticleTocSkeleton,
} from '@features'
import { Aside, Skeleton as SkeletonRect } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Columns } from '@shared/ui'

/**
 * Скелетон для отображения статьи.
 */
export const Skeleton = () => {
  const theme = useTheme()

  return (
    <Flex aria-busy="true" aria-label="Загрузка статьи" flexDirection="column" gap={theme.spacings.s32} role="status">
      <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
        <SkeletonRect height={14} width={220} />
        <ArticleHeaderSkeleton />
      </Flex>

      <Columns>
        <ArticleBodySkeleton />
        <Aside>
          <ArticleTocSkeleton />
          <ArticleSkillsSkeleton />
          <ArticleAdSkeleton />
        </Aside>
      </Columns>
    </Flex>
  )
}
