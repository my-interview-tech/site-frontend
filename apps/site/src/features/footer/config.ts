import { externalLinks } from '@shared/constants'

export const SOCIALS = [
  { href: externalLinks.max, icon: 'icons/icon-max.png', label: 'Max' },
  { href: externalLinks.vk, icon: 'icons/icon-vk.svg', label: 'VK' },
  { href: externalLinks.telegram, icon: 'icons/icon-telegram.svg', label: 'Telegram' },
  { href: externalLinks.discord, icon: 'icons/icon-discord.svg', label: 'Discord' },
] as const

export const TEXT = {
  COPYRIGHT: '© 2026 ИП Калушко Вадим Алексеевич',
  REQUISITES: 'ИНН 231849496378 · ОГРНИП 325237500082552 ·',
  RUSPROFILE: 'rusprofile.ru',
  TAGLINE: ['Всё для подготовки к IT-собеседованиям', 'в одном месте'],
} as const
