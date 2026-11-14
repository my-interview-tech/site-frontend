import { useCallback, useEffect, useRef, useState } from 'react'

import type { DraftStorage, UseDraftOptions, UseDraftResult } from './types'

const SAVE_DELAY_MS = 500

const safe = <T>(action: () => T, fallback: T): T => {
  try {
    return action()
  } catch {
    return fallback
  }
}

export const localDraftStorage: DraftStorage = {
  get: (key) => safe(() => window.localStorage.getItem(key), null),
  remove: (key) => safe(() => window.localStorage.removeItem(key), undefined),
  set: (key, value) => safe(() => window.localStorage.setItem(key, value), undefined),
}

export const draftKey = (tech: string, id: string) => `task-draft:v1:${tech}:${id}`

const readDraft = (storage: DraftStorage, key: string): string | null => {
  const raw = storage.get(key)

  if (!raw) {
    return null
  }

  const parsed = safe(() => JSON.parse(raw) as { code?: unknown }, null)

  return typeof parsed?.code === 'string' ? parsed.code : null
}

/**
 * Черновик решения: переживает уход со страницы и перезагрузку.
 *
 * @description
 * - Запись — через 500 мс после последней правки, при `pagehide` и при размонтировании.
 * - Код, равный стартовому, не хранится.
 */
export const useDraft = ({ initial, key, storage = localDraftStorage }: UseDraftOptions): UseDraftResult => {
  const [code, setCode] = useState(() => readDraft(storage, key) ?? initial)
  const pending = useRef<string | null>(null)

  const flush = useCallback(() => {
    const value = pending.current

    if (value === null) {
      return
    }

    pending.current = null

    if (value === initial) {
      storage.remove(key)
    } else {
      storage.set(key, JSON.stringify({ code: value, updatedAt: Date.now() }))
    }
  }, [initial, key, storage])

  useEffect(() => {
    window.addEventListener('pagehide', flush)

    return () => {
      window.removeEventListener('pagehide', flush)
      flush()
    }
  }, [flush])

  useEffect(() => {
    if (pending.current === null) {
      return undefined
    }

    const timer = window.setTimeout(flush, SAVE_DELAY_MS)

    return () => window.clearTimeout(timer)
  }, [code, flush])

  const update = useCallback((next: string) => {
    pending.current = next
    setCode(next)
  }, [])

  const reset = useCallback(() => {
    pending.current = null
    storage.remove(key)
    setCode(initial)
  }, [initial, key, storage])

  return { code, reset, setCode: update }
}
