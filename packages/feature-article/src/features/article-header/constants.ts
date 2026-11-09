import type { BadgeColor } from '@my-interview/ui-kit'

import type { ArticleBadgeVariant } from '@shared/model'

export const BADGE_COLOR = {
  accent: 'purple',
  question: 'purple',
  quiz: 'green',
  task: 'orange',
} as const satisfies Record<ArticleBadgeVariant, BadgeColor>

export const TEXT = {
  SKILLS: 'Навыки',
} as const
