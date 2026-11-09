import { theme } from '@my-interview/ui-kit'
import type { ListBlockProps } from './ListBlock.types'
import { Styled } from './ListBlock.styled'

/**
 * Маркированный список.
 */
export const ListBlock = ({ children }: ListBlockProps) => (
  <Styled.List flexDirection="column" forwardedAs="ul" gap={theme.spacings.s10}>
    {children}
  </Styled.List>
)
