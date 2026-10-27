import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'

import { Styled } from './styled'

/**
 * Заглушка карточки рекомендации.
 */
export const RecommendationCardSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Placeholder flexDirection="column" gap={theme.spacings.s12} p={theme.spacings.s12}>
      <Skeleton height={12} width={96} />
      <Skeleton height={12} />
      <Skeleton height={12} width={160} />
      <Skeleton height={12} width={120} />
    </Styled.Placeholder>
  )
}
