import styled from 'styled-components'

import { theme } from '@my-interview/ui-kit'

const Popover = styled.div`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r16}px;
  box-shadow: ${theme.shadows.overlay};
  padding: ${theme.spacings.s8}px;
  position: absolute;
  right: 0;
  top: calc(100% + ${theme.spacings.s8}px);
  z-index: 3;
`

export const Styled = {
  Popover,
}
