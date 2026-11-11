import { createContext, useContext } from 'react'

import type { GuestHeaderValue } from '../../types'

export const GuestHeaderContext = createContext<GuestHeaderValue | null>(null)

/**
 * Сдвиг и поверхность шапки из `GuestHeaderProvider`.
 *
 * @description
 * Вне провайдера бросает ошибку.
 */
export const useGuestHeader = (): GuestHeaderValue => {
  const value = useContext(GuestHeaderContext)

  if (!value) {
    throw new Error('Guest header is unavailable')
  }

  return value
}
