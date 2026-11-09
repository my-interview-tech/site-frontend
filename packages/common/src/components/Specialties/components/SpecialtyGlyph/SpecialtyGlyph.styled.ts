import styled from 'styled-components'

import { Icon as UiIcon, theme } from '@my-interview/ui-kit'

const Icon = styled(UiIcon)`
  display: none;
  flex-shrink: 0;

  @media (max-width: ${theme.breakpoints.tablet}px) {
    display: block;
  }
`

export const Styled = {
  Icon,
}
