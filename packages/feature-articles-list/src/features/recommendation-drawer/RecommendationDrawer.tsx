import { Drawer } from '@my-interview/ui-kit'

import { RecommendationCard } from '@articles-list/entities/recommendation'

import type { RecommendationDrawerProps } from './types'

/**
 * Шторка с рекомендацией.
 */
export const RecommendationDrawer = ({ isOpen, onClose, title, ...props }: RecommendationDrawerProps) => (
  <Drawer open={isOpen} title={title} onClose={onClose}>
    <RecommendationCard inDrawer title={title} {...props} />
  </Drawer>
)
