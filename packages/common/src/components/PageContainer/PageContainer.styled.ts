import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

const Root = styled.div`
  background: ${theme.colors.page};
  padding-left: ${theme.container.paddingMobile}px;
  padding-right: ${theme.container.paddingMobile}px;
  user-select: text;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    padding-left: ${theme.container.paddingTablet}px;
    padding-right: ${theme.container.paddingTablet}px;
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    padding-left: ${theme.container.padding}px;
    padding-right: ${theme.container.padding}px;
  }
`

export const Styled = {
  Root,
}
