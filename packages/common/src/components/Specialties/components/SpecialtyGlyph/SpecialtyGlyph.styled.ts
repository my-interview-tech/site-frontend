import styled from 'styled-components'

import { Icon as UiIcon, theme } from '@my-interview/ui-kit'

const Icon = styled(UiIcon)`
  display: block;
  flex-shrink: 0;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    display: none;
  }
`

export const Styled = {
  Icon,
}
