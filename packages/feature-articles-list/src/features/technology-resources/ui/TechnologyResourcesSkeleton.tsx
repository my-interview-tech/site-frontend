import { SkeletonRect } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { SKELETON_CARDS } from '../constants'
import { Styled } from './styled'

/**
 * Заглушка карусели материалов.
 */
export const TechnologyResourcesSkeleton = () => (
  <Styled.Resources flexDirection="column" forwardedAs="section" gap={theme.spacings.s16} p={theme.spacings.s20}>
    <SkeletonRect height={26} width={175} />
    <Styled.SkeletonRow>
      {SKELETON_CARDS.map((card) => (
        <SkeletonRect key={card} height={120} radius={10} />
      ))}
    </Styled.SkeletonRow>
  </Styled.Resources>
)
