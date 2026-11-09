import { snapshot, STORAGE_KEY } from './storage'
import { notify } from './subscribe'

/**
 * Отметить задачу решённой в этом браузере. Вкладки синхронизируются через событие `storage`.
 */
export const markSolved = (tech: string, id: string): void => {
  const current = snapshot()
  const solved = current[tech] ?? []

  if (solved.includes(id)) {
    return
  }

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, [tech]: [...solved, id] }))
  } catch {
    return
  }

  notify()
}
