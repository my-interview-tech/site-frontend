import type { Task } from '@task/shared/model'

export type TaskStatementProps = Pick<
  Task,
  'hiddenCount' | 'interview' | 'language' | 'lead' | 'outcome' | 'skill' | 'statement' | 'tests' | 'title'
> & {
  /**
   * Результат последнего прогона по `id` теста. Без записи кейс не запускался.
   */
  results?: Readonly<Record<string, { readonly message?: string; readonly passed: boolean }>>

  /**
   * Прогон идёт: на строках `describe` и `it` крутится индикатор.
   */
  running?: boolean

  /**
   * Последний прогон не прошёл: рамка красная, пока флаг не снимут.
   */
  failed?: boolean

  /**
   * Текущий код проходит все тесты: рамка условия зелёная.
   */
  solved?: boolean

  /**
   * Адрес разводящей задач.
   */
  tasksHref: string
}

/** Открытый тест в условии. */
export type StatementTest = TaskStatementProps['tests'][number]

/** Подряд идущие тесты с одним кодом. */
export type TestGroup = {
  code: string
  items: StatementTest[]
}

/** Ожидаемое и полученное значение упавшего теста. */
export type TestDiff = {
  expected: string
  received: string
}

/** Состояние строки теста. */
export type SuiteState = 'failed' | 'idle' | 'passed' | 'running'

/** Вкладка условия. */
export type StatementPane = 'description' | 'review' | 'skills'

export type ScaleMarksProps = {
  /**
   * Подпись шкалы.
   */
  label: string

  /**
   * Значение из документа, строкой.
   */
  value: string
}
