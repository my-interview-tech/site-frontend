import type { CSSProperties } from 'react'
import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Column = styled(Flex)<{ $alignSelf?: CSSProperties['alignSelf'] }>`
  align-self: ${({ $alignSelf }) => $alignSelf ?? 'auto'};
  position: static;
  top: ${theme.spacings.s96}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    position: sticky;
  }
`

export const Styled = {
  Column,
}
