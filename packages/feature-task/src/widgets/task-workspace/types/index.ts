import type { TaskAttemptProps } from '@task/features/task-attempt'
import type { Task } from '@task/shared/model'

export type TaskWorkspaceProps = Task &
  Pick<TaskAttemptProps, 'draftStorage' | 'onRunComplete' | 'onSolved'> & {
    /**
     * Адрес разводящей задач.
     */
    tasksHref: string
  }

/**
 * Панель, видимая ниже планшета.
 */
export type WorkspaceTab = 'code' | 'result' | 'statement'
