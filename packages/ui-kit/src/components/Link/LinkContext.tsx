import { createContext, useContext } from 'react'

import type { LinkProps } from './Link.types'
import type { LinkComponent, LinkProviderProps } from './LinkContext.types'

const Anchor = ({ children, ...props }: LinkProps) => <a {...props}>{children}</a>

const LinkContext = createContext<LinkComponent>(Anchor)

/**
 * Подменяет ссылки ui-kit и пакетов на ссылки хоста: переход без перезагрузки страницы.
 */
export const LinkProvider = ({ children, component }: LinkProviderProps) => (
  <LinkContext.Provider value={component}>{children}</LinkContext.Provider>
)

/**
 * Компонент ссылки из ближайшего `LinkProvider`, без провайдера — обычный `<a>`.
 */
export const useLink = (): LinkComponent => useContext(LinkContext)
