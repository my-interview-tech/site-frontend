import { STORAGE_KEY } from './storage'

const listeners = new Set<() => void>()

export const notify = (): void => {
  listeners.forEach((listener) => listener())
}

const onStorage = (event: StorageEvent) => {
  if (event.key === STORAGE_KEY || event.key === null) {
    notify()
  }
}

export const subscribe = (listener: () => void): (() => void) => {
  if (listeners.size === 0) {
    window.addEventListener('storage', onStorage)
  }

  listeners.add(listener)

  return () => {
    listeners.delete(listener)

    if (listeners.size === 0) {
      window.removeEventListener('storage', onStorage)
    }
  }
}
