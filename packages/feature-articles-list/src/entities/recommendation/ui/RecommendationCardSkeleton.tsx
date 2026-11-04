import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Заглушка карточки рекомендации с отступами самой карточки.
 */
export const RecommendationCardSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Card $inDrawer={false}>
      <Skeleton height={16} width={128} />
      <Styled.Identity alignItems="center" gap={theme.spacings.s8}>
        <Skeleton height={24} radius={6} width={24} />
        <Skeleton height={24} width="70%" />
      </Styled.Identity>
      <Flex style={{ marginTop: theme.spacings.s4 }}>
        <Skeleton height={20} width="85%" />
      </Flex>
      <Styled.Track />
      <Styled.Link as="span" style={{ display: 'flex' }}>
        <Skeleton height={22} width={120} />
      </Styled.Link>
    </Styled.Card>
  )
}
