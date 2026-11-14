import { externalLinks } from '@shared/constants'

export const SOCIALS = [
  { href: externalLinks.max, icon: 'icon-max', label: 'Max' },
  { href: externalLinks.vk, icon: 'icon-vk', label: 'VK' },
  { href: externalLinks.telegram, icon: 'icon-telegram', label: 'Telegram' },
  { href: externalLinks.discord, icon: 'icon-discord', label: 'Discord' },
] as const

export const TEXT = {
  COPYRIGHT: '© 2026 ИП Калушко Вадим Алексеевич',
  REQUISITES: 'ИНН 231849496378 · ОГРНИП 325237500082552 ·',
  RUSPROFILE: 'rusprofile.ru',
  TAGLINE: ['Всё для подготовки к IT-собеседованиям', 'в одном месте'],
} as const
