import type { BadgeColor } from '@my-interview/ui-kit'

import type { TechnologyBadgeVariant } from '@articles-list/shared/model'

export const BADGE_COLOR = {
  accent: 'purple',
  question: 'purple',
  quiz: 'green',
  task: 'orange',
} as const satisfies Record<TechnologyBadgeVariant, BadgeColor>

export const TEXT = {
  RECOMMENDATIONS: 'Рекомендации',
} as const
