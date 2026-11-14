import type { TechnologyContext } from '@articles-list/shared/model'

export type TechnologyHeaderProps = TechnologyContext & {
  /**
   * Шторка рекомендаций открыта.
   */
  isRecommendationsOpen: boolean

  /**
   * Открыть шторку рекомендаций. Без обработчика кнопка не показывается.
   */
  onClick?: () => void
}
