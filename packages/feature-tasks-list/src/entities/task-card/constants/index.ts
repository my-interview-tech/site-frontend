export const LANGUAGE_ICON: Readonly<Record<string, string>> = {
  javascript: 'icon-javascript',
  react: 'icon-react',
  typescript: 'icon-typescript',
}

export const LANGUAGE_LABEL: Readonly<Record<string, string>> = {
  javascript: 'JavaScript',
  react: 'React',
  typescript: 'TypeScript',
}

export const TEXT = {
  ABANDONED: 'Задачу бросили',
  ADDED: 'Дата добавления',
  AUTHOR: 'Автор',
  LOCKED: 'Задача закрыта',
  OFFER: 'Оффер',
  OFFER_STUB: 'Заглушка',
  SAVE: 'В избранное',
  SAVED: 'Убрать из избранного',
  STUDIED: 'Задача решена',
  UNSOLVED: 'Ещё не решал',
} as const

export const SKELETON_WIDTHS = [320, 240, 280, 200, 320, 240, 280, 200] as const
