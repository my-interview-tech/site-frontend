/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useEffect, useState } from 'react'

import { PROFILE_KEY } from '../../constants'

const empty: ReadonlySet<string> = new Set()

/** Хранилище может быть недоступно целиком: `getItem` в Safari Private и при запрете кук бросает `SecurityError`. */
const readKnown = (): ReadonlySet<string> => {
  try {
    const raw = window.localStorage.getItem(PROFILE_KEY)

    if (!raw) {
      return empty
    }

    const parsed: unknown = JSON.parse(raw)

    if (typeof parsed !== 'object' || parsed === null || !('roadmaps' in parsed)) {
      return empty
    }

    const { roadmaps } = parsed as { roadmaps?: unknown }

    if (!Array.isArray(roadmaps)) {
      return empty
    }

    return new Set(roadmaps.filter((item): item is string => typeof item === 'string'))
  } catch {
    return empty
  }
}

/**
 * Изученные слаги из профиля. Перечитывает, когда профиль меняется в другой вкладке.
 */
export const useKnownTopics = (): ReadonlySet<string> => {
  const [known, setKnown] = useState(readKnown)

  useEffect(() => {
    const sync = (event: StorageEvent) => {
      if (event.key === null || event.key === PROFILE_KEY) {
        setKnown(readKnown())
      }
    }

    window.addEventListener('storage', sync)

    return () => window.removeEventListener('storage', sync)
  }, [])

  return known
}
