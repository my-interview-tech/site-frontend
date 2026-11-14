import type { ArticleBadge, ArticleContext } from '@shared/model'

export type ArticleHeaderProps = ArticleContext & {
  /**
   * Бейдж справа в шапке. Без него слот пустой.
   */
  badge?: ArticleBadge

  /**
   * Открыть карточку навыка.
   */
  onClick: () => void

  /**
   * Шторка навыка открыта.
   */
  isSkillsOpen: boolean
}
