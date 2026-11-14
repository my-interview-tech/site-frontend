import type { BadgeColor } from '@my-interview/ui-kit'

import type { TechnologyItemKind } from '@articles-list/shared/model'

export const KIND_LABEL = {
  article: 'статья',
  question: 'вопрос',
  quiz: 'квиз',
  task: 'задача',
} as const

export const KIND_BADGE_COLOR = {
  article: 'gray',
  question: 'purple',
  quiz: 'green',
  task: 'orange',
} as const satisfies Record<TechnologyItemKind, BadgeColor>

export const TechnologyItemStatus = {
  DEFAULT: 'default',
  LOCKED: 'locked',
  STUDIED: 'studied',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type TechnologyItemStatus = (typeof TechnologyItemStatus)[keyof typeof TechnologyItemStatus]

export const TEXT = {
  BOOKMARK: 'Закладка',
  STATUS: 'Статус',
} as const

export const SKELETON_WIDTHS = [280, 220, 260, 180] as const
