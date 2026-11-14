import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const STICKY_TOP = theme.spacings.s96

const Switcher = styled(Flex)`
  pointer-events: none;
  position: sticky;
  top: ${STICKY_TOP}px;
  z-index: 3;

  & > * {
    pointer-events: auto;
  }
`

const Heading = styled(Flex)`
  margin: 0 auto;
  max-width: 720px;
  text-align: center;
`

export const Styled = {
  Heading,
  Switcher,
}
