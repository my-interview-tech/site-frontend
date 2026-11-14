import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { TaskWorkspace as Component } from '@task/widgets/task-workspace'

import { useResponse } from '../hooks'
import type { TaskViewProps } from '../types'
import { Skeleton } from './Skeleton'
import { Styled } from './styled'

/**
 * Экран задачи.
 */
export const TaskView = ({
  draftStorage,
  id,
  nav,
  onBack,
  onRunComplete,
  onSolved,
  tasksHref,
  tech,
}: TaskViewProps) => {
  const { pageStatus, reload, task } = useResponse({ id, tech })

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS:
        return (
          <Styled.Frame flexDirection="column" gap={theme.spacings.s12}>
            {nav?.(task)}
            <Component
              key={`${task.tech}:${task.id}`}
              {...task}
              draftStorage={draftStorage}
              tasksHref={tasksHref}
              tech={tech}
              onRunComplete={onRunComplete}
              onSolved={onSolved}
            />
          </Styled.Frame>
        )
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
