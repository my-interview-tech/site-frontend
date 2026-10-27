import type { ArticleMetaData } from '@shared/model'

export type ArticleSkillsProps = ArticleMetaData & {
  /**
   * Закрыть шторку.
   */
  onClose: () => void

  /**
   * Шторка открыта.
   */
  isSkillsOpen: boolean
}
