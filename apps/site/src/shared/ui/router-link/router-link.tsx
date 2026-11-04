import { Link } from 'react-router'

import type { LinkProps } from '@my-interview/ui-kit'

const isInternal = (href: string) => href.startsWith('/') && !href.startsWith('//')

/** Внутренние адреса ведёт роутер без перезагрузки, внешние и `target` остаются обычной ссылкой. */
const RouterLink = ({ children, href, ...props }: LinkProps) => {
  if (!isInternal(href) || props.target || props.download !== undefined) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }

  return (
    <Link to={href} {...props}>
      {children}
    </Link>
  )
}

export { RouterLink }
