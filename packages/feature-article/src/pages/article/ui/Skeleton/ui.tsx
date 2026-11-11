import { ArticleBodySkeleton, ArticleHeaderSkeleton, ArticleSkillsSkeleton, ArticleTocSkeleton } from '@features'
import { Aside, Columns, SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

/**
 * Скелетон для отображения статьи.
 */
export const Skeleton = () => (
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
      </Aside>
    </Columns>
  </Flex>
)
