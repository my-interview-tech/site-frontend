export type Shadows = { [Key in keyof typeof shadowsLight]: string }

/**
 * Шкала высоты: `sm` — карточка в покое, `md` — карточка при наведении, `lg` — выделенная карточка и плашка,
 * `overlay` — всплывающее меню и модалка, `up` — тень вверх у нижних панелей, `accent` — свечение акцентной кнопки.
 */
export const shadowsLight = {
  sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.03), 0px 2px 4px 0px rgba(0, 0, 0, 0.03)',
  md: '0px 3px 10px 0px rgba(114, 46, 209, 0.08), 0px 1px 2px 0px rgba(0, 0, 0, 0.03)',
  lg: '0px 8px 24px 0px rgba(114, 46, 209, 0.12), 0px 2px 6px 0px rgba(0, 0, 0, 0.04)',
  overlay: '0px 12px 32px 0px rgba(31, 20, 71, 0.28), 0px 2px 8px 0px rgba(0, 0, 0, 0.06)',
  up: '0px -6px 20px 0px rgba(0, 0, 0, 0.08), 0px -2px 6px 0px rgba(0, 0, 0, 0.04)',
  accent: '0px 8px 16px 0px rgba(92, 56, 229, 0.32), 0px 2px 6px 0px rgba(0, 0, 0, 0.04)',
} as const satisfies Record<string, string>

export const shadowsDark: Shadows = {
  sm: '0px 1px 2px 0px rgba(0, 0, 0, 0.4), 0px 2px 4px 0px rgba(0, 0, 0, 0.35)',
  md: '0px 3px 10px 0px rgba(114, 46, 209, 0.35), 0px 1px 2px 0px rgba(0, 0, 0, 0.4)',
  lg: '0px 8px 24px 0px rgba(114, 46, 209, 0.28), 0px 2px 6px 0px rgba(0, 0, 0, 0.35)',
  overlay: '0px 12px 32px 0px rgba(0, 0, 0, 0.55), 0px 2px 8px 0px rgba(0, 0, 0, 0.35)',
  up: '0px -6px 20px 0px rgba(0, 0, 0, 0.45), 0px -2px 6px 0px rgba(0, 0, 0, 0.3)',
  accent: '0px 8px 16px 0px rgba(114, 46, 209, 0.45), 0px 2px 6px 0px rgba(0, 0, 0, 0.35)',
}
