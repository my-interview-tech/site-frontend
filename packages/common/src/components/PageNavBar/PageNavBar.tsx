import { Breadcrumb, theme } from '@my-interview/ui-kit'

import type { PageNavBarProps } from './PageNavBar.types'
import { Styled } from './PageNavBar.styled'

/**
 * Колонка страницы: крошки и содержимое под ними.
 */
export const PageNavBar = ({ children, crumbs }: PageNavBarProps) => (
  <Styled.Frame flexDirection="column" gap={theme.spacings.s12}>
    <Breadcrumb items={crumbs} />
    {children}
  </Styled.Frame>
)
