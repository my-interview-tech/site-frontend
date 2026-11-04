import type { Locale } from '../lib'
import type { NavItem } from '../types'

export const TEXT = {
  LANGUAGE: 'Язык',
  LOGIN: 'Войти',
  LOGO: 'my-interview.tech',
  MENU_CLOSE: 'Закрыть меню',
  MENU_OPEN: 'Открыть меню',
} as const

export const LOCALES = [
  { flag: 'icons/flag-ru.svg', id: 'ru', label: 'RU' },
  { flag: 'icons/flag-en.svg', id: 'en', label: 'EN' },
] as const satisfies readonly { flag: string; id: Locale; label: string }[]

export const MENU: NavItem[] = [
  { label: 'Специальности', sectionId: 'specialties' },
  { href: '/topics', label: 'Дорожная карта' },
  { href: '/tasks', label: 'Задачи' },
  {
    links: [
      { href: '/about', label: 'О сервисе' },
      { href: '/contacts', label: 'Контакты' },
    ],
    title: 'FAQ',
  },
]
