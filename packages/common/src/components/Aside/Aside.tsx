import { theme } from '@my-interview/ui-kit'

import type { AsideProps } from './Aside.types'
import { Styled } from './Aside.styled'

/**
 * Липкая колонка. До 768px перестаёт прилипать.
 */
export const Aside = ({ alignSelf, children }: AsideProps) => (
  <Styled.Column $alignSelf={alignSelf} flexDirection="column" forwardedAs="aside" gap={theme.spacings.s16}>
    {children}
  </Styled.Column>
)
