import { Aside, Columns, SkeletonRect } from '@my-interview/common'
import { Flex, theme, useBreakpoint } from '@my-interview/ui-kit'

import { TechnologyHeaderSkeleton } from '@articles-list/features/technology-header'
import { TechnologyResourcesSkeleton } from '@articles-list/features/technology-resources'
import { TechnologySectionsSkeleton } from '@articles-list/features/technology-sections'
import { RecommendationCardSkeleton } from '@articles-list/entities/recommendation'

const TopicTocSkeleton = () => {
  const { isMobile } = useBreakpoint()

  if (isMobile) {
    return null
  }

  return (
    <Flex flexDirection="column">
      <Flex p={`${theme.spacings.s2}px ${theme.spacings.s12}px ${theme.spacings.s8}px`}>
        <SkeletonRect height={16} width={148} />
      </Flex>
      <Flex p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}>
        <SkeletonRect height={22} width="78%" />
      </Flex>
      <Flex p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}>
        <SkeletonRect height={22} width="62%" />
      </Flex>
    </Flex>
  )
}

/**
 * Скелетон страницы технологии.
 */
export const Skeleton = () => (
  <Flex aria-busy="true" aria-label="Загрузка темы" flexDirection="column" gap={theme.spacings.s32} role="status">
    <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
      <SkeletonRect height={22} width={160} />
      <TechnologyHeaderSkeleton />
    </Flex>
    <Columns gap={theme.spacings.s40} sidebar={280}>
      <Flex flexDirection="column" gap={theme.spacings.s32} style={{ minWidth: 0 }}>
        <TechnologySectionsSkeleton />
        <TechnologyResourcesSkeleton />
      </Flex>
      <Aside alignSelf="start">
        <TopicTocSkeleton />
        <RecommendationCardSkeleton />
      </Aside>
    </Columns>
  </Flex>
)
