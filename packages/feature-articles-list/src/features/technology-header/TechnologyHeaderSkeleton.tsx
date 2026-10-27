import { useTheme } from 'styled-components'

import { Skeleton } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон аккордеона технологии.
 */
export const TechnologyHeaderSkeleton = () => {
  const theme = useTheme()

  return (
    <Styled.Section>
      <Flex alignItems="center" gap={theme.spacings.s16}>
        <Skeleton height={48} radius={10} width={48} />

        <Flex flex={1} flexDirection="column" gap={theme.spacings.s4} style={{ minWidth: 0 }}>
          <Skeleton height={16} width={220} />
          <Skeleton height={14} width={280} />
        </Flex>
        <Skeleton height={20} radius={8} width={160} />
      </Flex>
    </Styled.Section>
  )
}
