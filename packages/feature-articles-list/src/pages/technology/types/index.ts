import type { Crumb } from '@my-interview/ui-kit'

import type { TechnologyScreen } from '@articles-list/shared/model'

export type TechnologyViewProps = {
  /**
   * Хлебные крошки по загруженному экрану.
   */
  crumbs: (screen: TechnologyScreen) => Crumb[]

  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void

  /**
   * Слаг технологии.
   */
  slug: string
}
