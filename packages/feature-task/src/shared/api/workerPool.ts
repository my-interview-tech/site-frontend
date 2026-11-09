import type { RunInput, RunOptions, RunReport } from '@task/shared/model'

import type { HostMessage, WorkerMessage } from './worker.protocol'

interface Warm {
  readonly ready: Promise<boolean>
  readonly worker: Worker
}

const RUN_TIMEOUT_MS = 2000

const BOOT_TIMEOUT_MS = 15000

const TIMEOUT: RunReport = { cases: [], error: 'Превышено время выполнения' }

const CRASH: RunReport = { cases: [], error: 'Раннер завершился с ошибкой' }

let spare: Warm | null = null

const spawn = (): Warm => {
  const worker = new Worker(new URL('./task.worker.ts', import.meta.url), { type: 'module' })
  const ready = new Promise<boolean>((resolve) => {
    const timer = window.setTimeout(() => resolve(false), BOOT_TIMEOUT_MS)

    const settle = (value: boolean) => {
      window.clearTimeout(timer)
      worker.removeEventListener('message', onMessage)
      worker.removeEventListener('error', onError)
      resolve(value)
    }

    const onMessage = (event: MessageEvent<WorkerMessage>) => {
      if (event.data.type === 'ready') {
        settle(true)
      }
    }

    const onError = () => settle(false)

    worker.addEventListener('message', onMessage)
    worker.addEventListener('error', onError)
  })

  return { ready, worker }
}

/**
 * Забрать прогретый воркер и сразу поднять следующий: загрузка окружения не съедает время прогона.
 */
const take = (): Warm => {
  const current = spare ?? spawn()

  spare = spawn()

  return current
}

/**
 * Поднять воркер заранее, например при открытии задачи.
 */
const prewarm = () => {
  spare ??= spawn()
}

const abortError = () => new DOMException('Прогон отменён', 'AbortError')

/**
 * Один прогон в отдельном воркере. Таймаут считается с момента, когда окружение готово.
 * По `signal` воркер убивается, промис отклоняется с `AbortError`.
 */
const runInWorker = (input: RunInput, { signal }: RunOptions = {}): Promise<RunReport> => {
  if (signal?.aborted) {
    return Promise.reject(abortError())
  }

  const { ready, worker } = take()

  return new Promise<RunReport>((resolve, reject) => {
    let timer = 0

    const finish = () => {
      window.clearTimeout(timer)
      signal?.removeEventListener('abort', onAbort)
      worker.terminate()
    }

    const onAbort = () => {
      finish()
      reject(abortError())
    }

    signal?.addEventListener('abort', onAbort, { once: true })

    worker.addEventListener('message', (event: MessageEvent<WorkerMessage>) => {
      if (event.data.type === 'report') {
        finish()
        resolve(event.data.report)
      }
    })

    worker.addEventListener('error', () => {
      finish()
      resolve(CRASH)
    })

    void ready.then((isReady) => {
      if (signal?.aborted) {
        return
      }

      if (!isReady) {
        finish()
        resolve(CRASH)

        return
      }

      timer = window.setTimeout(() => {
        finish()
        resolve(TIMEOUT)
      }, RUN_TIMEOUT_MS)

      worker.postMessage({ input, type: 'run' } satisfies HostMessage)
    })
  })
}

export { prewarm, runInWorker }
