/**
 * Статус загрузки экрана.
 * `LOADING` — скелетон, `ERROR` — ошибка запроса или пустой ответ, `SUCCESS` — можно показать данные.
 */
export const EPageStatus = {
  ERROR: 'error',
  LOADING: 'loading',
  SUCCESS: 'success',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type EPageStatus = (typeof EPageStatus)[keyof typeof EPageStatus]

/**
 * Доступ к материалу по подписке.
 * `FREE` — открыт без подписки, в API это значение `open`.
 * `SUBSCRIPTION` — без подписки видна только открытая часть.
 */
export const ESubscriptionAccess = {
  FREE: 'open',
  SUBSCRIPTION: 'subscription',
} as const

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type ESubscriptionAccess = (typeof ESubscriptionAccess)[keyof typeof ESubscriptionAccess]
