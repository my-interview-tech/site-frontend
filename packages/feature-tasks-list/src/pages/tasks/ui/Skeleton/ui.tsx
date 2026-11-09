import { AD_SLOT_SIZE, Aside, Columns, SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { TasksFilterSkeleton } from '@tasks-list/features/tasks-filter'
import { TaskCardItemSkeleton } from '@tasks-list/entities/task-card'

import { TEXT } from '../../config'
import { Styled } from './styled'

/**
 * Скелетон разводящей задач.
 */
export const Skeleton = () => (
  <Styled.Frame flexDirection="column" gap={theme.spacings.s12}>
    <SkeletonRect height={22} width={160} />
    <Columns gap={theme.spacings.s40} sidebar={280}>
      <Styled.Frame flexDirection="column" gap={theme.spacings.s16}>
        <Flex gap={theme.spacings.s20} justifyContent="center">
          <SkeletonRect height={36} radius={8} width={148} />
          <SkeletonRect height={36} radius={8} width={124} />
        </Flex>
        <Flex alignItems="flex-end" gap={theme.spacings.s12}>
          <Styled.Frame flex={1}>
            <SkeletonRect height={40} radius={10} />
          </Styled.Frame>
          <Flex alignItems="flex-end" gap={theme.spacings.s8}>
            <Flex flexDirection="column" gap={theme.spacings.s8} width={220}>
              <SkeletonRect height={22} width={108} />
              <SkeletonRect height={40} radius={10} />
            </Flex>
            <SkeletonRect height={40} radius={10} width={40} />
          </Flex>
        </Flex>
        <Styled.List aria-busy="true" aria-label={TEXT.LOADING} role="status">
          <TaskCardItemSkeleton />
        </Styled.List>
      </Styled.Frame>
      <Aside alignSelf="start">
        <TasksFilterSkeleton />
        <SkeletonRect
          height={AD_SLOT_SIZE.sidebar.height}
          radius={theme.radii.r16}
          width={AD_SLOT_SIZE.sidebar.width}
        />
      </Aside>
    </Columns>
  </Styled.Frame>
)
