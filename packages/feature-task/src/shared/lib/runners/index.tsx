import { createContext, useContext, type ReactNode } from 'react'

import type { TaskRunner } from '@task/shared/model'

const RunnersContext = createContext<readonly TaskRunner[]>([])

export type TaskRunnerProviderProps = {
  readonly children: ReactNode

  /**
   * Раннеры для языков вне воркера, например Python на бэкенде.
   */
  readonly runners: readonly TaskRunner[]
}

/**
 * Внешние раннеры для экрана задачи. Перекрывают встроенный воркер и `registerRunner`.
 */
export const TaskRunnerProvider = ({ children, runners }: TaskRunnerProviderProps) => (
  <RunnersContext.Provider value={runners}>{children}</RunnersContext.Provider>
)

export const useTaskRunners = () => useContext(RunnersContext)
