import type { TaskSelection } from '../types'

export const EMPTY_SELECTION: TaskSelection = {
  companies: [],
  difficulties: [],
  languages: [],
  order: 'asc',
  premium: false,
  query: '',
  sort: 'default',
  status: 'all',
  tags: [],
}

export const TEXT = {
  ALL: 'Все',
  COMPANIES: 'Компании',
  DIFFICULTY: 'Сложность',
  LEVEL: 'Уровень',
  LANGUAGES: 'Язык',
  PREMIUM: 'Premium',
  RESET: 'Сбросить',
  STATUS: 'Статус',
  TAGS: 'Темы',
  TITLE: 'Фильтры',
  UNSOLVED: 'Не решённые',
} as const

export const DIFFICULTY_HINT = {
  EASIEST: 'легче',
  HARDEST: 'сложнее',
} as const
