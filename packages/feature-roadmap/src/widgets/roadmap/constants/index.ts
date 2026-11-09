import type { BreakpointState } from '@my-interview/ui-kit'

export const TEXT = {
  ALL: 'Все',
  ANY: 'Не важно',
  LAYER: 'Кто вы',
  STACK: 'На чём',
  TOC: 'Разделы',
  TRACKS: 'Треки',
} as const

/** Префикс id якоря: голый слаг совпадает с другими якорями страницы. */
export const ANCHOR_PREFIX = 'roadmap-'

/** Ключ профиля в `localStorage`, поле `roadmaps` — изученные слаги. */
export const PROFILE_KEY = 'my-interview-profile'

/** Граф шириной 980px помещается в `PageContainer` от `desktopS`. Уже — список шагов. */
export const GRAPH_BREAKPOINTS: readonly BreakpointState['breakpoint'][] = [
  'desktopS',
  'desktopM',
  'desktopL',
  'desktopXL',
]

/** Граф и оглавление рядом помещаются от `desktopM`. */
export const TOC_BREAKPOINTS: readonly BreakpointState['breakpoint'][] = ['desktopM', 'desktopL', 'desktopXL']

/** Ширина колонки оглавления, px. С графом 980px и отступом занимает поле `desktopM`. */
export const TOC_WIDTH = 160

/** Два поля фильтра в ряд под заголовком. */
export const FILTERS_MAX_WIDTH = 440
