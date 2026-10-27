import styled from 'styled-components'

import { belowTablet, tabletOnly } from '@my-interview/ui-kit'

const Layout = styled.div`
  background: ${({ theme }) => theme.colors.page};
  padding: 0 ${({ theme }) => theme.layout.pageGutter}px;
  user-select: text;

  ${({ theme }) => tabletOnly(theme)} {
    padding: 0 ${({ theme }) => theme.layout.pageGutterTablet}px;
  }

  ${({ theme }) => belowTablet(theme)} {
    padding: 0 ${({ theme }) => theme.layout.pageGutterMobile}px;
  }
`

export const Styled = {
  Layout,
}
