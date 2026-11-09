import type { ComponentType, ReactNode } from 'react'

import type { LinkProps } from './Link.types'

/**
 * Компонент ссылки хоста, например адаптер над `Link` роутера.
 */
export type LinkComponent = ComponentType<LinkProps>

export type LinkProviderProps = {
  /**
   * Дочерние элементы.
   */
  children: ReactNode

  /**
   * Компонент ссылки хоста, например адаптер над `Link` роутера.
   */
  component: LinkComponent
}
