/** Контейнер страницы: максимальная ширина и горизонтальные поля по брейкпоинтам. */
const container = {
  maxWidth: 1440,
  padding: 140,
  paddingTablet: 48,
  paddingMobile: 16,
} as const

type Container = { [Key in keyof typeof container]: number }

export type { Container }
export { container }
