import type { DraftStorage } from '@task/shared/lib'
import type { ConsoleEntry, RunMode, RunReport, Task, TaskRequest } from '@task/shared/model'

/**
 * Последний прогон решения.
 */
export type AttemptRun = {
  /**
   * Какие тесты гоняли.
   */
  mode: RunMode

  /**
   * Отчёт раннера. `null`, пока идёт прогон.
   */
  report: RunReport | null

  /**
   * Прогон идёт.
   */
  running: boolean
}

export type TaskAttemptProps = Pick<Task, 'hints' | 'id' | 'language' | 'starter' | 'tech' | 'tests'> & {
  /**
   * Где хранить черновик. По умолчанию `localStorage`.
   */
  draftStorage?: DraftStorage

  /**
   * Начало и конец прогона.
   */
  onRun: (run: AttemptRun) => void

  /**
   * «Сбросить»: черновик уже стартовый, прогон и терминал нужно очистить снаружи.
   */
  onReset?: () => void

  /**
   * Текущий код проходит все тесты. `false` — правка или сброс.
   */
  onAcceptedChange?: (accepted: boolean) => void

  /**
   * Куда ведёт «Перейти к решениям».
   */
  tasksHref: string

  /**
   * Прогон закончен, отчёт готов.
   */
  onRunComplete?: (report: RunReport, mode: RunMode) => void

  /**
   * «Сдать» прошло все тесты.
   */
  onSolved?: (task: TaskRequest) => void

  /**
   * Прогон идёт: кнопки и горячие клавиши заблокированы.
   */
  running: boolean
}

export type LogLineProps = {
  /**
   * Запись `console` из прогона.
   */
  entry: ConsoleEntry
}

export type TaskConsoleProps = {
  /**
   * Накопленный вывод. «Очистить» и «Сбросить» обнуляют его снаружи.
   */
  entries: readonly ConsoleEntry[]

  /**
   * Очистить стек.
   */
  onClear: () => void
}
