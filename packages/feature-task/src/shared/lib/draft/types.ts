/**
 * Где хранить черновики решений. По умолчанию `localStorage`.
 */
export interface DraftStorage {
  get: (key: string) => string | null
  remove: (key: string) => void
  set: (key: string, value: string) => void
}

export type UseDraftOptions = {
  /**
   * Стартовый код. Пока черновик совпадает с ним, черновик не хранится.
   */
  initial: string

  /**
   * Ключ черновика.
   * @example `task-draft:v1:react:react-task`
   */
  key: string

  storage?: DraftStorage
}

export type UseDraftResult = {
  /**
   * Текущий код: черновик или стартовый.
   */
  code: string

  /**
   * Вернуть стартовый код и удалить черновик.
   */
  reset: () => void

  setCode: (code: string) => void
}
