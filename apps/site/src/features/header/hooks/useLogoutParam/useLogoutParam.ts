import { useEffect } from 'react'

/**
 * Хук для выхода из сессии, если в адресе есть `logout=1`, и убирает этот параметр.
 */
export const useLogoutParam = (logout: () => void): void => {
  useEffect(() => {
    const url = new URL(window.location.href)

    if (url.searchParams.get('logout') !== '1') {
      return
    }

    logout()
    url.searchParams.delete('logout')
    window.history.replaceState(null, '', `${url.pathname}${url.search}${url.hash}`)
  }, [logout])
}
