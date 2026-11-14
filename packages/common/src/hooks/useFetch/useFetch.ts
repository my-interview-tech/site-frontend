import { useCallback, useEffect, useRef, useState } from 'react'
import type { UseFetchResult } from './useFetch.types'

/**
 * Запрос по ключу.
 * Смена `key` или `reload` снова показывает загрузку и сбрасывает данные.
 * Ответ после размонтирования или нового запроса не записывается.
 */
export const useFetch = <Data>(key: string, fetcher: () => Promise<Data>): UseFetchResult<Data> => {
  const fetcherRef = useRef(fetcher)
  const [attempt, setAttempt] = useState(0)
  const [data, setData] = useState<Data | null>(null)
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  fetcherRef.current = fetcher

  const reload = useCallback(() => {
    setAttempt((value) => value + 1)
  }, [])

  useEffect(() => {
    let active = true

    setData(null)
    setError(null)
    setIsLoading(true)

    void fetcherRef.current().then(
      (next) => {
        if (!active) {
          return
        }

        setData(next)
        setError(null)
        setIsLoading(false)
      },
      (reason: unknown) => {
        if (!active) {
          return
        }

        setData(null)
        setError(reason instanceof Error ? reason : new Error('unavailable'))
        setIsLoading(false)
      }
    )

    return () => {
      active = false
    }
  }, [attempt, key])

  return { data, error, isLoading, reload }
}
