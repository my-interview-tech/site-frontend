import type { LinkProps } from './Link.types'
import { useLink } from './LinkContext'

/**
 * Ссылка через компонент из `LinkProvider`.
 * Подходит для `as={Link}` у `Button` и styled-компонентов.
 */
export const Link = (props: LinkProps) => {
  const Component = useLink()

  return <Component {...props} />
}
