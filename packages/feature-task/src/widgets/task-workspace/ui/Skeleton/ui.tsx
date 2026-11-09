import { theme } from '@my-interview/ui-kit'

import { TaskAttemptSkeleton } from '@task/features/task-attempt'
import { TaskStatementSkeleton } from '@task/entities/task-statement'

import { Styled } from '../styled'

/**
 * Скелетон.
 */
export const TaskWorkspaceSkeleton = () => (
  <Styled.Grid>
    <Styled.Pane $hidden={false} flexDirection="column">
      <TaskStatementSkeleton />
    </Styled.Pane>

    <Styled.Pane $hidden={false} flexDirection="column" gap={theme.spacings.s12}>
      <TaskAttemptSkeleton />
    </Styled.Pane>
  </Styled.Grid>
)
