import styled from 'styled-components'

import { pageGutter } from '@my-interview/ui-kit'

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.page};
  ${({ theme }) => pageGutter(theme)}
`

export const Styled = {
  Layout,
}
