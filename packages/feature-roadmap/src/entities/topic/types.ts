import type { Topic } from '@roadmap/shared/config'

export type TopicCardProps = {
  /**
   * Адрес темы.
   */
  href?: string

  /**
   * Тема вне фильтра.
   */
  isDimmed: boolean

  /**
   * Карточка на всю ширину, описание внутри вместо подсказки.
   */
  isFluid?: boolean

  /**
   * Тема отмечена изученной в профиле.
   */
  isKnown: boolean

  /**
   * Тема трека.
   */
  topic: Topic
}
