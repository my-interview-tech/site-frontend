import type { ArticleContext } from '@shared/model'

export type ArticleHeaderProps = ArticleContext & {
  /**
   * Открыть карточку навыка.
   */
  onClick: () => void

  /**
   * Шторка навыка открыта.
   */
  isSkillsOpen: boolean
}
