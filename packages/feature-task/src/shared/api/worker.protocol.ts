import type { RunInput, RunReport } from '@task/shared/model'

/** Из воркера: окружение загружено — или прогон закончен. */
export type WorkerMessage = { type: 'ready' } | { report: RunReport; type: 'report' }

/** В воркер: прогнать решение. */
export type HostMessage = { input: RunInput; type: 'run' }
