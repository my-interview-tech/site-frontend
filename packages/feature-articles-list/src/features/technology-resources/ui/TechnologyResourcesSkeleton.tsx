import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'

import { SKELETON_CARDS } from '../constants'
import { Styled } from './styled'

/**
 * Заглушка карусели материалов.
 */
export const TechnologyResourcesSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Resources flexDirection="column" forwardedAs="section" gap={theme.spacings.s16} p={theme.spacings.s20}>
      <Skeleton height={14} width={175} />
      <Styled.SkeletonRow>
        {SKELETON_CARDS.map((card) => (
          <Skeleton key={card} height={120} radius={10} />
        ))}
      </Styled.SkeletonRow>
    </Styled.Resources>
  )
}
