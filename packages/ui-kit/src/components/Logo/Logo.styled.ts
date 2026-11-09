import styled from 'styled-components'

import { Link } from '../Link'
import { Text } from '../Text'

const Anchor = styled(Link)`
  display: inline-flex;
  text-decoration: none;
`

const Name = styled(Text)`
  transition: color 200ms ease;
`

export const Styled = {
  Anchor,
  Name,
}
