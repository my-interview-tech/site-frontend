import type { AnchorHTMLAttributes, Ref } from 'react'

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /**
   * Адрес. Внутренний — с `/`, внешний — с протоколом.
   */
  href: string

  /**
   * Ссылка на элемент.
   */
  ref?: Ref<HTMLAnchorElement>
}
