import { useEffect, useState } from 'react'

const getMatch = (query: string): boolean => {
  if (typeof window === 'undefined') {
    return false
  }

  return window.matchMedia(query).matches
}

/**
 * Совпадение медиа-запроса с подпиской на изменения.
 * На сервере — `false`, пока не смонтируется клиент.
 */
export const useMatchMedia = (query: string): boolean => {
  const [isMatch, setIsMatch] = useState(() => getMatch(query))

  useEffect(() => {
    const media = window.matchMedia(query)

    const apply = () => {
      setIsMatch(media.matches)
    }

    apply()
    media.addEventListener('change', apply)

    return () => {
      media.removeEventListener('change', apply)
    }
  }, [query])

  return isMatch
}
