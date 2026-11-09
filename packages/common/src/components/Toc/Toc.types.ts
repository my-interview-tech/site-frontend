/** `group` — подпись без перехода. `link` — пункт. */
export type TocItemType = 'group' | 'link'

/** Уровень пункта. `2` сдвигает ссылку вправо. */
export type TocItemLevel = 1 | 2

export interface TocItem {
  /**
   * Идентификатор пункта.
   */
  id: string

  /**
   * Текст пункта.
   */
  label: string

  /**
   * `group` — подпись без перехода. `link` — пункт.
   * @default 'link'
   */
  type?: TocItemType

  /**
   * Уровень пункта. `2` сдвигает ссылку вправо.
   * @default 1
   */
  level?: TocItemLevel
}

export interface TocProps<T extends TocItem = TocItem> {
  /**
   * Выбранный пункт.
   */
  activeId: string

  /**
   * Заголовок над пунктами.
   */
  label: string

  /**
   * Пункты.
   */
  items: T[]

  /**
   * Выбор пункта.
   */
  onSelect: (item: T) => void
}
