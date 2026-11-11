import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

/**
 * Скелетон квиза.
 */
export const Skeleton = () => (
  <Flex aria-busy="true" aria-label="Загрузка квиза" flexDirection="column" gap={theme.spacings.s16} role="status">
    <SkeletonRect height={14} width={120} />
    <SkeletonRect height={28} width={360} />
    <SkeletonRect height={52} width="100%" />
    <SkeletonRect height={52} width="100%" />
    <SkeletonRect height={52} width="100%" />
    <SkeletonRect height={52} width="100%" />
  </Flex>
)
