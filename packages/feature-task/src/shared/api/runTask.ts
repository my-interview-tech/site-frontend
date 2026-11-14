import type { RunInput, RunOptions, RunReport, TaskRunner } from '@task/shared/model'

import { runInWorker } from './workerPool'

const builtIn = new Set(['javascript', 'react', 'typescript'])

const runners = new Map<string, TaskRunner>()

/**
 * Глобальная регистрация внешнего раннера. Предпочтительнее `TaskRunnerProvider`.
 */
const registerRunner = (runner: TaskRunner) => {
  runner.languages.forEach((language) => {
    runners.set(language, runner)
  })
}

type RunTaskOptions = RunOptions & {
  /**
   * Раннеры из `TaskRunnerProvider`. Перекрывают зарегистрированные глобально.
   */
  readonly runners?: readonly TaskRunner[]
}

const runnerFor = (language: string, provided: readonly TaskRunner[] = []) =>
  provided.find((runner) => runner.languages.includes(language)) ?? runners.get(language)

const runTask = (input: RunInput, { runners: provided, signal }: RunTaskOptions = {}): Promise<RunReport> => {
  const runner = runnerFor(input.language, provided)

  if (runner) {
    return runner.run(input, { signal })
  }

  if (!builtIn.has(input.language)) {
    return Promise.resolve({ cases: [], error: 'раннер не подключён' })
  }

  return runInWorker(input, { signal })
}

const isAbortError = (error: unknown) => error instanceof DOMException && error.name === 'AbortError'

export type { RunTaskOptions }
export { isAbortError, registerRunner, runTask }
