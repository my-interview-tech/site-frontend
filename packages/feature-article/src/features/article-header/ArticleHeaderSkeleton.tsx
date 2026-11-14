import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон аккордеона статьи.
 */
export const ArticleHeaderSkeleton = () => (
  <Styled.Section flexDirection="column" forwardedAs="section">
    <Flex alignItems="center" gap={theme.spacings.s16} p={`${theme.spacings.s16}px ${theme.spacings.s20}px`}>
      <SkeletonRect height={48} radius={10} width={48} />

      <Flex flex={1} flexDirection="column" gap={theme.spacings.s4} style={{ minWidth: 0 }}>
        <SkeletonRect height={24} width={220} />
        <SkeletonRect height={18} width={280} />
      </Flex>
      <SkeletonRect height={36} radius={8} width={36} />
    </Flex>
  </Styled.Section>
)
