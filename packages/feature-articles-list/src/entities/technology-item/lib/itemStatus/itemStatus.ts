import type { TechnologyItem } from '@articles-list/shared/model'

import { TechnologyItemStatus } from '../../constants'

/**
 * Отметка строки: закрытый материал важнее изученного.
 */
export const itemStatus = ({ isAvailable, isStudied }: TechnologyItem): TechnologyItemStatus => {
  switch (true) {
    case !isAvailable:
      return TechnologyItemStatus.LOCKED
    case isStudied:
      return TechnologyItemStatus.STUDIED
    default:
      return TechnologyItemStatus.DEFAULT
  }
}
