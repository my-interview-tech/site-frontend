import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон аккордеона статьи.
 */
export const ArticleHeaderSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Section>
      <Flex alignItems="center" gap={theme.spacings.s16}>
        <Skeleton height={48} radius={10} width={48} />

        <Flex flex={1} flexDirection="column" gap={theme.spacings.s4} style={{ minWidth: 0 }}>
          <Skeleton height={24} width={220} />
          <Skeleton height={18} width={280} />
        </Flex>
        <Skeleton height={36} radius={8} width={36} />
      </Flex>
    </Styled.Section>
  )
}
