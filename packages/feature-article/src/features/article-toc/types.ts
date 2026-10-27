import type { ArticleTocItem } from '@shared/model'

export type ArticleTocProps = {
  /**
   * Id раздела в зоне чтения.
   */
  activeId: string

  /**
   * Заголовок оглавления.
   */
  label: string

  /**
   * Пункты оглавления.
   */
  items: ArticleTocItem[]

  /**
   * Прокрутить страницу к разделу.
   */
  onSelect: (id: string) => void
}
