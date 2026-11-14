import type { TechnologyRecommendation } from '@articles-list/shared/model'

export type RecommendationCardProps = TechnologyRecommendation & {
  /**
   * Подпись карточки.
   */
  label: string

  /**
   * Карточка внутри шторки.
   * @default `false`
   */
  inDrawer?: boolean
}
