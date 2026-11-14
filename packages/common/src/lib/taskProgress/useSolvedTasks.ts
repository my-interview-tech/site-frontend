import { useMemo, useSyncExternalStore } from 'react'

import { subscribe } from './subscribe'
import { EMPTY, snapshot } from './storage'

/**
 * Решённые задачи технологии в этом браузере.
 */
export const useSolvedTasks = (tech: string): ReadonlySet<string> => {
  const progress = useSyncExternalStore(subscribe, snapshot, () => EMPTY)
  const solved = progress[tech]

  return useMemo(() => new Set(Array.isArray(solved) ? solved : []), [solved])
}
