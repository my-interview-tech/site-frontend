import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'

const HEIGHT = 40

const Field = styled.input`
  ${textStyle(400)}
  appearance: none;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textPrimary};
  height: ${HEIGHT}px;
  min-width: 0;
  outline: none;
  padding: 0 ${theme.spacings.s12}px;
  transition: border-color 0.15s ease;
  width: 100%;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &::placeholder {
    color: ${theme.colors.textTertiary};
  }

  &:hover {
    border-color: ${theme.colors.borderStrong};
  }

  &:focus-visible {
    border-color: ${theme.colors.accent};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const Styled = {
  Field,
}
