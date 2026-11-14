import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { Styled } from '../styled'

/**
 * Заглушка панели фильтров.
 */
export const TasksFilterSkeleton = () => (
  <Styled.Panel flexDirection="column" gap={theme.spacings.s20} p={theme.spacings.s20}>
    <SkeletonRect height={24} width={96} />
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <SkeletonRect height={22} width={72} />
      <SkeletonRect height={40} radius={10} />
    </Flex>
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <SkeletonRect height={22} width={96} />
      <SkeletonRect height={40} radius={10} />
    </Flex>
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <SkeletonRect height={22} width={56} />
      <SkeletonRect height={40} radius={10} />
    </Flex>
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <SkeletonRect height={22} width={88} />
      <SkeletonRect height={40} radius={10} />
    </Flex>
  </Styled.Panel>
)
