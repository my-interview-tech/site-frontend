import { useTheme } from 'styled-components'

import { AdSlotSkeleton, Aside, Columns, Skeleton as SkeletonRect } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { TechnologyHeaderSkeleton } from '@articles-list/features/technology-header'
import { TechnologyResourcesSkeleton } from '@articles-list/features/technology-resources'
import { TechnologySectionsSkeleton } from '@articles-list/features/technology-sections'
import { RecommendationCardSkeleton } from '@articles-list/entities/recommendation'

/**
 * Скелетон страницы технологии.
 */
export const Skeleton = () => {
  const theme = useTheme()

  return (
    <Flex aria-busy="true" aria-label="Загрузка темы" flexDirection="column" gap={theme.spacings.s32} role="status">
      <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
        <SkeletonRect height={14} width={160} />
        <TechnologyHeaderSkeleton />
      </Flex>
      <Columns gap={theme.spacings.s40} sidebar={280}>
        <Flex flexDirection="column" gap={theme.spacings.s32} style={{ minWidth: 0 }}>
          <TechnologySectionsSkeleton />
          <TechnologyResourcesSkeleton />
        </Flex>
        <Aside alignSelf="start">
          <RecommendationCardSkeleton />
          <AdSlotSkeleton />
        </Aside>
      </Columns>
    </Flex>
  )
}
