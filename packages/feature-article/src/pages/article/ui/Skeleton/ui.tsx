import { ArticleBodySkeleton, ArticleHeaderSkeleton, ArticleSkillsSkeleton, ArticleTocSkeleton } from '@features'
import { Aside, SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон для отображения статьи.
 */
export const Skeleton = () => (
  <Flex aria-busy="true" aria-label="Загрузка статьи" flexDirection="column" gap={theme.spacings.s32} role="status">
    <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
      <SkeletonRect height={22} width={220} />
      <ArticleHeaderSkeleton />
    </Flex>

    <Styled.Layout>
      <ArticleBodySkeleton />
      <Styled.Side>
        <Aside>
          <ArticleTocSkeleton />
          <ArticleSkillsSkeleton />
        </Aside>
      </Styled.Side>
    </Styled.Layout>
  </Flex>
)
