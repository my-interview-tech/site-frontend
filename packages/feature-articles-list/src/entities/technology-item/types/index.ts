import type { TechnologyItem } from '@articles-list/shared/model'

export type { TechnologyItemStatus } from '../constants'

export type TechnologyItemRowProps = {
  /**
   * Адрес материала. Без него заголовок не ссылка.
   */
  href?: string

  /**
   * Материал.
   */
  item: TechnologyItem
}
