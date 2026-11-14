import { BottomSheet } from '@my-interview/ui-kit'

import { ArticleMeta } from '@entities/article-meta'
import type { ArticleSkillsProps } from './types'

/**
 * Шторка с карточкой навыка.
 */
export const ArticleSkills = ({ onClose, isSkillsOpen, skillLabel, ...props }: ArticleSkillsProps) => (
  <BottomSheet isOpen={isSkillsOpen} title={skillLabel} onClose={onClose}>
    <ArticleMeta inDrawer skillLabel={skillLabel} {...props} />
  </BottomSheet>
)
