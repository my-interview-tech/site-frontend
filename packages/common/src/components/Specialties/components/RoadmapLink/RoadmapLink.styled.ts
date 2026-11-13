import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Link = styled(Flex)`
  ${textStyle(500)}
  background: ${theme.colors.page};
  border-radius: ${theme.radii.rPill}px;
  color: ${theme.colors.textPrimary};
  margin-left: auto;
  text-decoration: none;

  @media (hover: hover) and (min-width: ${theme.breakpoints.tablet}px) {
    &:hover {
      color: ${theme.colors.accent};
    }
  }
`

export const Styled = {
  Link,
}
