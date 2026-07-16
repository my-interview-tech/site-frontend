import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router'

import { useSession } from '../../../entities/session'

type AuthGuardProps = {
  children: ReactNode
}

export const AuthGuard = ({ children }: AuthGuardProps) => {
  const { isAuthenticated } = useSession()
  const location = useLocation()

  if (!isAuthenticated && location.pathname !== '/login') {
    return <Navigate replace to="/login" state={{ from: location.pathname }} />
  }

  return children
}
