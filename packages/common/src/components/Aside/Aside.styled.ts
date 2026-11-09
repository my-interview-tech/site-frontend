import type { CSSProperties } from 'react'
import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Column = styled(Flex)<{ $alignSelf?: CSSProperties['alignSelf'] }>`
  align-self: ${({ $alignSelf }) => $alignSelf ?? 'auto'};
  position: sticky;
  top: ${theme.spacings.s96}px;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    position: static;
  }
`

export const Styled = {
  Column,
}
