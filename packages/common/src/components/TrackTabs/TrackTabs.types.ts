/** Пункт вкладок. */
export interface TrackTabsItem {
  /**
   * Ключ вкладки.
   */
  id: string

  /**
   * Подпись вкладки.
   */
  title: string
}

export interface TrackTabsProps {
  /**
   * Ключ выбранной вкладки.
   */
  activeId?: string

  /**
   * Ключ пересчёта бегунка. Меняется вместе с набором вкладок или выбранной.
   */
  activeKey: string

  /**
   * Вкладки.
   */
  items: readonly TrackTabsItem[]

  /**
   * Событие "выбрать вкладку".
   */
  onSelect: (id: string) => void
}

/**
 * Положение бегунка относительно корня.
 */
export interface ThumbBox {
  height: number
  width: number
  x: number
  y: number
}
