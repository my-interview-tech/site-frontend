import styled, { css } from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import type { BadgeColor } from './Badge.types'

const TONE = {
  blueOutline: css`
    background: ${theme.colors.chipBlue};
    border: 1px solid ${theme.colors.blueBorder};
    color: ${theme.colors.blue};
  `,
  gray: css`
    background: ${theme.colors.chip};
    color: ${theme.colors.textSecondary};
  `,
  grayOutline: css`
    background: ${theme.colors.chip};
    border: 1px solid ${theme.colors.borderCard};
    color: ${theme.colors.muted};
  `,
  green: css`
    background: ${theme.colors.badgeQuizBg};
    color: ${theme.colors.badgeQuiz};
  `,
  orange: css`
    background: ${theme.colors.badgeTaskBg};
    color: ${theme.colors.badgeTask};
  `,
  purple: css`
    background: ${theme.colors.accentSoft};
    color: ${theme.colors.accent};
  `,
  purpleOutline: css`
    background: ${theme.colors.accentBg};
    border: 1px solid ${theme.colors.accentLine};
    color: ${theme.colors.accent};
  `,
  redOutline: css`
    background: ${theme.colors.dangerBg};
    border: 1px solid ${theme.colors.dangerBorder};
    color: ${theme.colors.danger};
  `,
} satisfies Record<BadgeColor, ReturnType<typeof css>>

const Component = styled.span<{ $color: BadgeColor }>`
  ${textStyle(200, { weight: 'semibold' })}
  ${({ $color }) => TONE[$color]}
  ${({ $color, theme: appTheme }) =>
    appTheme.mode === 'dark' &&
    $color !== 'redOutline' &&
    css`
      color: ${appTheme.colors.white};
    `}
  align-items: center;
  border-radius: ${theme.radii.rPill}px;
  display: inline-flex;
  flex-shrink: 0;
  gap: ${theme.spacings.s4}px;
  padding: ${theme.spacings.s4}px ${theme.spacings.s8}px;
  white-space: nowrap;
`

export const Styled = {
  Component,
}
