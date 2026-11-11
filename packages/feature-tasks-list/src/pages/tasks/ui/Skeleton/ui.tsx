import { Aside, SkeletonRect } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { featureToggles } from '@tasks-list/widgets/tasks-content'
import { TasksFilterSkeleton } from '@tasks-list/features/tasks-filter'
import { TaskCardItemSkeleton } from '@tasks-list/entities/task-card'

import { TEXT } from '../../config'
import { Styled } from './styled'

/**
 * Скелетон разводящей задач.
 */
export const Skeleton = () => (
  <Flex flexDirection="column" gap={theme.spacings.s12}>
    <SkeletonRect height={22} width={160} />
    <Styled.Layout>
      <Flex flexDirection="column" gap={theme.spacings.s16}>
        {featureToggles.catalogTabs && (
          <Flex gap={theme.spacings.s20} justifyContent="center">
            <SkeletonRect height={36} radius={8} width={148} />
            <SkeletonRect height={36} radius={8} width={124} />
          </Flex>
        )}
        <Flex alignItems="flex-end" flexWrap="wrap" gap={theme.spacings.s12}>
          <Flex fillWidth flex="1 1 100%" tablet={{ flex: '1 1 0' }}>
            <SkeletonRect height={40} radius={10} />
          </Flex>
          <Flex alignItems="flex-end" gap={theme.spacings.s8}>
            <Styled.Sort>
              <SkeletonRect height={22} width={108} />
              <SkeletonRect height={40} radius={10} />
            </Styled.Sort>
            <SkeletonRect height={40} radius={10} width={40} />
            <SkeletonRect height={40} radius={10} width={40} />
          </Flex>
        </Flex>
        <Styled.List aria-busy="true" aria-label={TEXT.LOADING} role="status">
          <TaskCardItemSkeleton />
        </Styled.List>
      </Flex>
      <Styled.Side>
        <Aside alignSelf="start">
          <TasksFilterSkeleton />
        </Aside>
      </Styled.Side>
    </Styled.Layout>
  </Flex>
)
