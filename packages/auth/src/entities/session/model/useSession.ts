import { useCallback, useState } from 'react'

type Session = {
  userId: string
  name: string
}

const SESSION_KEY = 'my-interview-dev-session'

const readSession = (): Session | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const raw = window.sessionStorage.getItem(SESSION_KEY)

  if (!raw) {
    return null
  }

  try {
    return JSON.parse(raw) as Session
  } catch {
    return null
  }
}

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(() => readSession())

  const login = useCallback((name: string) => {
    const nextSession = { userId: 'dev-user', name }

    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(nextSession))
    setSession(nextSession)
  }, [])

  const logout = useCallback(() => {
    window.sessionStorage.removeItem(SESSION_KEY)
    setSession(null)
  }, [])

  return { session, isAuthenticated: Boolean(session), login, logout }
}
