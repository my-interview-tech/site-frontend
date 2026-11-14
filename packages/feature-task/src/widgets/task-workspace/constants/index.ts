import type { WorkspaceTab } from '../types'

export const TABS: readonly { id: WorkspaceTab; label: string }[] = [
  { id: 'statement', label: 'Условие' },
  { id: 'code', label: 'Код' },
  { id: 'result', label: 'Терминал' },
]
