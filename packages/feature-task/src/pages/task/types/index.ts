import type { ReactNode } from 'react'

import type { DraftStorage } from '@task/shared/lib'
import type { RunMode, RunReport, Task, TaskRequest } from '@task/shared/model'

export type TaskViewProps = {
  /**
   * Где хранить черновик решения. По умолчанию `localStorage`.
   */
  draftStorage?: DraftStorage

  /**
   * Идентификатор задачи.
   */
  id: string

  /**
   * Узел над содержимым после загрузки. Хост передаёт крошки.
   */
  nav?: (task: Task) => ReactNode

  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void

  /**
   * Прогон закончен: аналитика, подсказки.
   */
  onRunComplete?: (report: RunReport, mode: RunMode) => void

  /**
   * «Сдать» прошло все тесты. Локальная отметка уже поставлена, хост может отправить её на бэкенд.
   */
  onSolved?: (task: TaskRequest) => void

  /**
   * Адрес разводящей задач: кнопка «Все задачи».
   * @example `/tasks`
   */
  tasksHref: string

  /**
   * Слаг технологии.
   */
  tech: string
}
