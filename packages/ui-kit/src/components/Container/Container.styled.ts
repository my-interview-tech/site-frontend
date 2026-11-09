import styled from 'styled-components'

import { theme } from '../../theme/theme'

const Root = styled.div`
  padding-left: ${theme.container.paddingMobile}px;
  padding-right: ${theme.container.paddingMobile}px;

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
