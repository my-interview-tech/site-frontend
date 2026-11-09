import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Panel = styled(Card)`
  overflow: hidden;
`

const Group = styled(Flex)`
  scroll-margin-top: ${theme.spacings.s96}px;
`

const Section = styled(Flex)`
  scroll-margin-top: ${theme.spacings.s96}px;
`

export const Styled = {
  Group,
  Panel,
  Section,
}
