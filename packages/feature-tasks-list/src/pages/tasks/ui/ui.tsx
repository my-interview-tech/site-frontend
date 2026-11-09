import { EPageStatus, ErrorState, PageContainer } from '@my-interview/common'

import { theme } from '@my-interview/ui-kit'
import { TasksContent as Component } from '@tasks-list/widgets/tasks-content'

import { useResponse } from '../hooks'
import type { TasksViewProps } from '../types'
import { Skeleton } from './Skeleton'
import { Styled } from './styled'

/**
 * Каталог задач.
 */
export const TasksView = ({ nav, onBack, onSelectionChange, selection }: TasksViewProps) => {
  const { pageStatus, reload, screen } = useResponse()

  const ScreenComponent = (() => {
    switch (pageStatus) {
      case EPageStatus.LOADING:
        return <Skeleton />
      case EPageStatus.ERROR:
        return <ErrorState onBack={onBack} onReload={reload} />
      case EPageStatus.SUCCESS:
        return (
          <Styled.Frame flexDirection="column" gap={theme.spacings.s12}>
            {nav?.(screen)}
            <Component {...screen} selection={selection} onSelectionChange={onSelectionChange} />
          </Styled.Frame>
        )
      default:
        return null
    }
  })()

  return <PageContainer>{ScreenComponent}</PageContainer>
}
