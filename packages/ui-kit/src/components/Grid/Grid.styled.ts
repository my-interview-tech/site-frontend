import styled, { css } from 'styled-components'
import { theme } from '../../theme/theme'

const Root = styled.div`
  box-sizing: border-box;
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(4, 1fr);

  ${css`
    @media (min-width: ${theme.breakpoints.tablet}px) {
      gap: 32px;
      grid-template-columns: repeat(12, 1fr);
    }
  `}
`

const Item = styled.div<{ $size?: number }>`
  grid-column: span 4;
  position: relative;
  width: 100%;

  ${({ $size }) => css`
    @media (min-width: ${theme.breakpoints.tablet}px) {
      grid-column: ${$size ? `span ${$size}` : 'auto'};
    }
  `}
`

export const Styled = {
  Item,
  Root,
}
