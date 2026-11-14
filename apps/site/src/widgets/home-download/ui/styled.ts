import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Card = styled(Flex)`
  min-height: 0;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    min-height: 512px;
  }
`

const Copy = styled(Flex)`
  max-width: none;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    max-width: 560px;
  }
`

const Stores = styled(Flex)`
  background: ${theme.colors.storeCapsule};
  border: 1px solid ${theme.colors.borderSoft};
  border-radius: ${theme.radii.r14}px;
`

const Store = styled(Flex)`
  background: ${theme.colors.store};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.white};
  text-decoration: none;
`

export const Styled = {
  Card,
  Copy,
  Store,
  Stores,
}
