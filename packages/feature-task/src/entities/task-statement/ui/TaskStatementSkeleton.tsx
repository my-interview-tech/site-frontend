import { SkeletonRect } from '@my-interview/common'
import { Divider, Flex, theme } from '@my-interview/ui-kit'

import { Styled } from './styled'

/**
 * Скелетон условия.
 */
export const TaskStatementSkeleton = () => (
  <Styled.Column flexDirection="column" gap={theme.spacings.s16}>
    <Flex inline alignItems="center" gap={theme.spacings.s16}>
      <SkeletonRect height={48} radius={10} width={48} />
      <SkeletonRect height={48} radius={10} width={48} />
      <SkeletonRect height={48} radius={10} width={48} />
      <SkeletonRect height={48} radius={10} width={48} />
    </Flex>
    <Divider />
    <Styled.Panel $share={1} flexDirection="column" gap={theme.spacings.s12} p={theme.spacings.s24}>
      <Flex gap={theme.spacings.s20}>
        <SkeletonRect height={32} width={88} />
        <SkeletonRect height={32} width={140} />
        <SkeletonRect height={32} width={72} />
      </Flex>
      <SkeletonRect height={26} width="70%" />
      <SkeletonRect height={22} width="90%" />
      <SkeletonRect height={22} />
      <SkeletonRect height={22} width="60%" />
    </Styled.Panel>
    <Styled.Panel $share={2} flexDirection="column" gap={theme.spacings.s16} p={theme.spacings.s24}>
      <SkeletonRect height={24} width={148} />
      <SkeletonRect height={22} width="80%" />
      <SkeletonRect height={22} width="72%" />
      <SkeletonRect height={22} width="64%" />
    </Styled.Panel>
  </Styled.Column>
)
