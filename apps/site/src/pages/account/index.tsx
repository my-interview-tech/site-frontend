import { useEffect } from 'react'
import { Navigate } from 'react-router'

import { MAIN_APP_URL } from '@my-interview/auth'

import { featureToggles } from '@shared/config'

/**
 * Личный кабинет.
 *
 * @access private
 * @todo реализовать логику авторизации
 */
const AccountRoute = () => {
  useEffect(() => {
    if (!featureToggles.auth) {
      return
    }

    window.location.assign(MAIN_APP_URL)
  }, [])

  if (!featureToggles.auth) {
    return <Navigate replace to="/" />
  }

  return null
}

export default AccountRoute
