export type Progress = Readonly<Record<string, readonly string[]>>

export const STORAGE_KEY = 'task-progress:v1'

export const EMPTY: Progress = {}

let cachedRaw: string | null = null
let cached: Progress = EMPTY

const readRaw = (): string | null => {
  try {
    return window.localStorage.getItem(STORAGE_KEY)
  } catch {
    return null
  }
}

const parse = (raw: string | null): Progress => {
  if (!raw) {
    return EMPTY
  }

  try {
    const value: unknown = JSON.parse(raw)

    return typeof value === 'object' && value !== null ? (value as Progress) : EMPTY
  } catch {
    return EMPTY
  }
}

export const snapshot = (): Progress => {
  const raw = readRaw()

  if (raw !== cachedRaw) {
    cachedRaw = raw
    cached = parse(raw)
  }

  return cached
}
