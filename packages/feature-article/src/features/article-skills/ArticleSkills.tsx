import { Drawer } from '@my-interview/ui-kit'

import { ArticleMeta } from '@entities/article-meta'
import type { ArticleSkillsProps } from './types'

/**
 * Шторка с карточкой навыка.
 */
export const ArticleSkills = ({ onClose, isSkillsOpen, skillLabel, ...props }: ArticleSkillsProps) => (
  <Drawer onClose={onClose} open={isSkillsOpen} title={skillLabel}>
    <ArticleMeta inDrawer skillLabel={skillLabel} {...props} />
  </Drawer>
)
