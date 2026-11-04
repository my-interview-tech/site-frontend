import { externalLinks } from '@shared/constants'

import type { StoreLink } from '../types'

export const TEXT = {
  LEAD: 'Готовьтесь к собеседованиям в любое время: 1 200+ вопросов с критериями оценки, трекинг прогресса и сквозная синхронизация с сайтом.',
  PHONE_ALT: 'Мобильное приложение my-interview',
  TITLE: 'Мобильное приложение',
} as const

export const STORES: StoreLink[] = [
  { href: externalLinks.rustore, icon: 'store-rustore.svg', caption: 'Скачайте из', title: 'RuStore' },
  { href: externalLinks.googlePlay, icon: 'store-google-play.svg', caption: 'Доступно в', title: 'Google Play' },
  { href: '', icon: 'store-web.svg', caption: 'Открыть в', title: 'Браузере' },
]
