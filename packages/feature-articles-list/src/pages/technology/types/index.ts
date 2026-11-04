import type { ReactNode } from 'react'

import type { TechnologyScreen } from '@articles-list/shared/model'

export type TechnologyViewProps = {
  /**
   * Узел над содержимым после загрузки. Хост передаёт крошки.
   */
  nav?: (screen: TechnologyScreen) => ReactNode

  /**
   * Куда вести с экрана ошибки.
   */
  onBack: () => void

  /**
   * Слаг технологии.
   */
  slug: string
}
