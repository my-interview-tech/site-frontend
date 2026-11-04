import type { RefObject } from 'react'

import type { Locale } from '../../lib'

/**
 * Открытая панель шапки. `null`, если панели нет.
 */
export type Panel = 'lang' | null

export type LocaleState = {
  /**
   * Какая панель открыта.
   */
  panel: Panel

  /**
   * Контейнер панели.
   */
  clusterRef: RefObject<HTMLDivElement | null>

  /**
   * Открыть панель языка или закрыть, если она уже открыта.
   */
  togglePanel: (next: 'lang') => void

  /**
   * Текущий язык.
   */
  locale: Locale

  /**
   * Записать язык и закрыть панель.
   */
  chooseLocale: (next: Locale) => void
}
