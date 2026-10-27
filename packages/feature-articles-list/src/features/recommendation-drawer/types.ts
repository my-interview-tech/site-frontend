import type { RecommendationCardProps } from '@articles-list/entities/recommendation'

export type RecommendationDrawerProps = RecommendationCardProps & {
  /**
   * Шторка открыта.
   */
  isOpen: boolean

  /**
   * Закрыть шторку.
   */
  onClose: () => void
}
