import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Card = styled(Flex)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r12}px;
`

const SideNav = styled(Flex)`
  padding-top: 0;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    padding-top: ${theme.spacings.s8}px;
  }
`

export const Styled = {
  Card,
  SideNav,
}
