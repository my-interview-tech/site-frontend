import { SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { TaskWorkspaceSkeleton } from '@task/widgets/task-workspace'

import { TEXT } from '../../config'

/**
 * Скелетон экрана задачи.
 */
export const Skeleton = () => (
  <Flex aria-busy="true" aria-label={TEXT.LOADING} flexDirection="column" gap={theme.spacings.s12} role="status">
    <SkeletonRect height={22} width={200} />
    <TaskWorkspaceSkeleton />
  </Flex>
)
