import styled from 'styled-components'

import { theme } from '../../theme/theme'

const Root = styled.div`
  background: ${theme.colors.chip};
  border-radius: ${theme.radii.rPill}px;
  height: 4px;
  overflow: hidden;
  width: 100%;
`

const Fill = styled.div<{ $value: number }>`
  background: ${theme.colors.accent};
  height: 100%;
  transition: width 300ms ease;
  width: ${({ $value }) => $value}%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Styled = {
  Fill,
  Root,
}
