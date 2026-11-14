import type { NavItem } from '../types'

export const TEXT = {
  LOGO: 'my-interview.tech',
  MENU_CLOSE: 'Закрыть меню',
  MENU_OPEN: 'Открыть меню',
  TO_DARK: 'Тёмная тема',
  TO_LIGHT: 'Светлая тема',
} as const

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
