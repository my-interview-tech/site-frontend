import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import { theme } from './theme'

export type ThemeChoice = 'dark' | 'light'

export interface ThemeModeValue {
  mode: ThemeChoice
  toggle: () => void
}

const storageKey = 'my-interview-theme'

const ThemeModeContext = createContext<ThemeModeValue | null>(null)

const readChoice = (): ThemeChoice | null => {
  if (typeof window === 'undefined') {
    return null
  }

  const stored = window.localStorage.getItem(storageKey)

  if (stored === 'light' || stored === 'dark') {
    return stored
  }

  return null
}

const systemChoice = (): ThemeChoice => {
  if (typeof window === 'undefined') {
    return 'light'
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const ThemeModeProvider = ({ children }: { readonly children: ReactNode }) => {
  const [choice, setChoice] = useState<ThemeChoice | null>(readChoice)
  const [system, setSystem] = useState<ThemeChoice>(systemChoice)
  const mode = choice ?? system

  useEffect(() => {
    const query = window.matchMedia('(prefers-color-scheme: dark)')

    const apply = () => {
      setSystem(query.matches ? 'dark' : 'light')
    }

    query.addEventListener('change', apply)

    return () => query.removeEventListener('change', apply)
  }, [])

  const toggle = useCallback(() => {
    const next = mode === 'dark' ? 'light' : 'dark'

    window.localStorage.setItem(storageKey, next)
    setChoice(next)
  }, [mode])

  const providedTheme = useMemo(() => ({ ...theme, mode }), [mode])
  const value = useMemo(() => ({ mode, toggle }), [mode, toggle])

  return (
    <ThemeModeContext.Provider value={value}>
      <ThemeProvider theme={providedTheme}>{children}</ThemeProvider>
    </ThemeModeContext.Provider>
  )
}

export const useThemeMode = (): ThemeModeValue => {
  const value = useContext(ThemeModeContext)

  if (!value) {
    throw new Error('useThemeMode must be used within UiKitProvider')
  }

  return value
}
