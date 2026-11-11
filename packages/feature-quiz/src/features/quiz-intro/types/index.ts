export type QuizIntroProps = {
  /**
   * Темы, которые проверяет квиз.
   */
  checks: string[]
  /**
   * Попытка уже идёт, кнопка возвращает к вопросам.
   */
  isContinuation: boolean
  /**
   * Кнопка старта ждёт короткую задержку.
   */
  isStarting: boolean
  /**
   * Сколько вопросов в квизе.
   */
  questionCount: number
  /**
   * Название квиза.
   */
  title: string
  /**
   * Секунды на весь квиз.
   */
  totalSeconds: number
  /**
   * Старт или возврат к вопросам.
   */
  onBegin: () => void
}
