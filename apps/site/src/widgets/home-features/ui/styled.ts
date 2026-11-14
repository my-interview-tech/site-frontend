import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Row = styled(Flex)`
  border-bottom: 1px solid ${theme.colors.borderStrong};
  padding-bottom: ${theme.spacings.s48}px;

  & + & {
    margin-top: ${theme.spacings.s48}px;
  }
`

export const Styled = {
  Row,
}
