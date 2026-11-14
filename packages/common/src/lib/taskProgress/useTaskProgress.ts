import { useSyncExternalStore } from 'react'

import { subscribe } from './subscribe'
import { EMPTY, snapshot } from './storage'
import type { Progress } from './storage'

/**
 * Все отметки «решено» в этом браузере, по слагу технологии.
 */
export const useTaskProgress = (): Progress => useSyncExternalStore(subscribe, snapshot, () => EMPTY)
