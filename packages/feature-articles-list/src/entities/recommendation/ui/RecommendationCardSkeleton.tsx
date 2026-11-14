import { SkeletonRect } from '@my-interview/common'
import { Flex, Progress, theme } from '@my-interview/ui-kit'

import { TEXT } from '../constants'
import { Styled } from './styled'

/**
 * Заглушка карточки рекомендации с отступами самой карточки.
 */
export const RecommendationCardSkeleton = () => (
  <Styled.Card $inDrawer={false} flexDirection="column" gap={theme.spacings.s8} p={theme.spacings.s16}>
    <SkeletonRect height={16} width={128} />
    <Flex alignItems="center" gap={theme.spacings.s8}>
      <SkeletonRect height={24} radius={6} width={24} />
      <SkeletonRect height={24} width="70%" />
    </Flex>
    <SkeletonRect height={20} width="85%" />
    <Progress label={TEXT.PROGRESS} value={0} />
    <SkeletonRect height={22} width={120} />
  </Styled.Card>
)
