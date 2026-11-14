import type { TaskCard } from '@tasks-list/shared/model'

export type TaskCardItemProps = {
  /**
   * Задача в избранном.
   */
  favorite?: boolean

  /**
   * Задача.
   */
  item: TaskCard

  /**
   * Поставить или снять закладку.
   */
  onFavorite?: (id: string) => void
}
