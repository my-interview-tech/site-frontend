import styled, { useTheme } from 'styled-components'

import { AdSlotSkeleton, Aside, Columns, Skeleton as SkeletonRect } from '@my-interview/common'
import { Flex, belowTablet } from '@my-interview/ui-kit'

import { TechnologyHeaderSkeleton } from '@articles-list/features/technology-header'
import { TechnologyResourcesSkeleton } from '@articles-list/features/technology-resources'
import { TechnologySectionsSkeleton } from '@articles-list/features/technology-sections'
import { RecommendationCardSkeleton } from '@articles-list/entities/recommendation'

const Toc = styled.nav`
  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const TopicTocSkeleton = () => (
  <Toc>
    <Flex style={{ padding: '2px 12px 8px' }}>
      <SkeletonRect height={16} width={148} />
    </Flex>
    <Flex style={{ padding: '8px 12px' }}>
      <SkeletonRect height={22} width="78%" />
    </Flex>
    <Flex style={{ padding: '8px 12px' }}>
      <SkeletonRect height={22} width="62%" />
    </Flex>
  </Toc>
)

/**
 * Скелетон страницы технологии.
 */
export const Skeleton = () => {
  const theme = useTheme()

  return (
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
          <AdSlotSkeleton />
        </Aside>
      </Columns>
    </Flex>
  )
}
