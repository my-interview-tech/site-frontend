import type { QuizChoice, ResultItem, ResultStatus } from '@quiz/shared/model'

/** Экран попытки. */
export type QuizPhase = 'cooldown' | 'intro' | 'question' | 'result'

/** Разбор одного вопроса на экране итога. */
export type QuizReview = {
  /**
   * Выбранный текст. `null` — вопрос без ответа.
   */
  answer: string | null
  /**
   * Сколько шагов в квизе.
   */
  pagesCount: number
  /**
   * Текст вопроса.
   */
  question: string
  /**
   * Верный, неверный или пустой ответ.
   */
  status: ResultStatus
  /**
   * Номер шага с единицы.
   */
  stepNumber: number
}

/** Состояние попытки для сборки экрана. */
export type QuizSession = {
  /**
   * Можно вернуться на предыдущий шаг.
   */
  canGoBack: boolean
  /**
   * Видимый вопрос текущего шага.
   */
  choice: QuizChoice | undefined
  /**
   * Число верных ответов.
   */
  correctCount: number
  /**
   * Подзаголовок шага, если компонент title видим.
   */
  description: string | undefined
  /**
   * Число пустых ответов.
   */
  emptyCount: number
  /**
   * Ошибка текущего поля.
   */
  error: string | undefined
  /**
   * Подпись кнопки шага.
   */
  footerLabel: string | undefined
  /**
   * Пока кнопка старта ждёт короткую задержку.
   */
  isStarting: boolean
  /**
   * Пользователь смотрит описание, попытка уже начата.
   */
  isOnIntro: boolean
  /**
   * Секунды до конца попытки.
   */
  left: number
  /**
   * Вопросы, на которые не ответили, когда время вышло.
   */
  missed: ReadonlySet<string>
  /**
   * Подпись шага из navBar.
   */
  navLabel: string | undefined
  /**
   * Какой экран рисовать.
   */
  phase: QuizPhase
  /**
   * Все ответы верные.
   */
  passed: boolean
  /**
   * Самый дальний открытый шаг.
   */
  reached: number
  /**
   * Итог сдачи. `null` — квиз ещё идёт.
   */
  result: ResultItem[] | null
  /**
   * Открытый разбор вопроса.
   */
  review: QuizReview | null
  /**
   * Индекс шага в разборе. `null` — сводка.
   */
  reviewIndex: number | null
  /**
   * Попытка начата.
   */
  started: boolean
  /**
   * Текущий шаг.
   */
  step: number
  /**
   * Секунды на весь квиз.
   */
  totalSeconds: number
  /**
   * Выбранный вариант текущего вопроса.
   */
  value: string
  /**
   * Секунды до повторной попытки.
   */
  wait: number
  /**
   * Число неверных ответов.
   */
  wrongCount: number
  /**
   * Предыдущий шаг.
   */
  back: () => void
  /**
   * Старт или возврат к вопросам.
   */
  begin: () => void
  /**
   * Сдача с submit формы.
   */
  onFinish: () => void
  /**
   * Дальше или сдача с кнопки шага.
   */
  onPrimary: () => void
  /**
   * Открыть разбор вопроса.
   */
  openReview: (id: string) => void
  /**
   * Шаг или пункт итога.
   */
  openStep: (index: number) => void
  /**
   * Закрыть разбор и показать сводку.
   */
  openSummary: () => void
  /**
   * Новая попытка.
   */
  retry: () => void
  /**
   * Выбрать вариант.
   */
  select: (optionId: string) => void
  /**
   * Вернуться к описанию, не сбрасывая отсчёт.
   */
  toIntro: () => void
}
