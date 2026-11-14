import { Fragment } from 'react'

import { Styled } from './Breadcrumb.styled'
import type { BreadcrumbProps } from './Breadcrumb.types'

/**
 * Хлебные крошки: навигация по страницам.
 */
export const Breadcrumb = ({ items }: BreadcrumbProps) => (
  <Styled.Component aria-label="Панель навигации">
    {items.map(({ href, label }, index) => (
      <Fragment key={`${label}-${index}`}>
        {index > 0 && <Styled.Separator aria-hidden="true">·</Styled.Separator>}

        {href ? (
          <Styled.CrumbLink href={href}>{label}</Styled.CrumbLink>
        ) : (
          <Styled.Current aria-current="page">{label}</Styled.Current>
        )}
      </Fragment>
    ))}
  </Styled.Component>
)
