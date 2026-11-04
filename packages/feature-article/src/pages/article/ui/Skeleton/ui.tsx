import { useTheme } from 'styled-components'

import { ArticleBodySkeleton, ArticleHeaderSkeleton, ArticleSkillsSkeleton, ArticleTocSkeleton } from '@features'
import { AdSlotSkeleton, Aside, Columns, Skeleton as SkeletonRect } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

/**
 * Скелетон для отображения статьи.
 */
export const Skeleton = () => {
  const theme = useTheme()

  return (
    <Flex aria-busy="true" aria-label="Загрузка статьи" flexDirection="column" gap={theme.spacings.s32} role="status">
      <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
        <SkeletonRect height={22} width={220} />
        <ArticleHeaderSkeleton />
      </Flex>

      <Columns align="start" gap={theme.spacings.s20} sidebar={240}>
        <ArticleBodySkeleton />
        <Aside>
          <ArticleTocSkeleton />
          <ArticleSkillsSkeleton />
          <AdSlotSkeleton />
        </Aside>
      </Columns>
    </Flex>
  )
}
