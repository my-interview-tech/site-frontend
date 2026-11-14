import styled, { css } from 'styled-components'

import { theme } from '@my-interview/ui-kit'
import type { CaseState } from './CaseMark.types'

const tone = {
  failed: css`
    background: ${theme.colors.dangerBg};
    color: ${theme.colors.danger};
  `,
  idle: css`
    border: 1.5px solid ${theme.colors.borderStrong};
  `,
  passed: css`
    background: ${theme.colors.successBg};
    color: ${theme.colors.success};
  `,
}

const Mark = styled.span<{ $state: CaseState }>`
  align-items: center;
  border-radius: ${theme.radii.rPill}px;
  display: inline-flex;
  flex-shrink: 0;
  height: 20px;
  justify-content: center;
  width: 20px;
  ${({ $state }) => tone[$state]}
`

export const Styled = {
  Mark,
}
