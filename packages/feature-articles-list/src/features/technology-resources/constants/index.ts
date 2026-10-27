export const WINDOW_SIZE = 3
export const INTERVAL_MS = 4000
export const SKELETON_CARDS = [0, 1, 2] as const

export const TEXT = {
  NEXT: 'Следующие материалы',
  PREVIOUS: 'Предыдущие материалы',
  RESOURCES_TITLE: 'Полезные материалы',
} as const

export const dotLabel = (index: number): string => `Материалы, страница ${index + 1}`
