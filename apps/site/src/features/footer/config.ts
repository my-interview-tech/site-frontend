import { externalLinks } from '@shared/constants'

export const SOCIALS = [
  { href: externalLinks.max, icon: 'icon-max.png', label: 'Max' },
  { href: externalLinks.vk, icon: 'icon-vk.svg', label: 'VK' },
  { href: externalLinks.telegram, icon: 'icon-telegram.svg', label: 'Telegram' },
  { href: externalLinks.discord, icon: 'icon-discord.svg', label: 'Discord' },
] as const

export const TEXT = {
  COPYRIGHT: '© 2026 ИП Калушко Вадим Алексеевич',
  REQUISITES: 'ИНН 231849496378 · ОГРНИП 325237500082552 ·',
  RUSPROFILE: 'rusprofile.ru',
  TAGLINE: ['Всё для подготовки к IT-собеседованиям', 'в одном месте'],
} as const
