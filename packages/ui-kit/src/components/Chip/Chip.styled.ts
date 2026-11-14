import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Text } from '../Text'
import type { ChipSize } from './Chip.types'

const PADDING = {
  32: theme.spacings.s12,
  40: theme.spacings.s16,
} as const satisfies Record<ChipSize, number>

const Round = styled(ButtonBase)<{ $isSelected: boolean; $size: ChipSize }>`
  ${textStyle(400, { weight: 'semibold' })}
  background: ${({ $isSelected }) => ($isSelected ? theme.colors.accent : 'transparent')};
  border: 1px solid ${({ $isSelected }) => ($isSelected ? theme.colors.accent : theme.colors.border)};
  border-radius: ${theme.radii.rPill}px;
  color: ${({ $isSelected }) => ($isSelected ? theme.colors.white : theme.colors.textSecondary)};
  height: ${({ $size }) => $size}px;
  padding: 0 ${({ $size }) => PADDING[$size]}px;
`

const Rect = styled(Text)`
  border: 1px solid ${theme.colors.accent};
  border-radius: ${theme.radii.r8}px;
  display: inline-flex;
  padding: 5px ${theme.spacings.s10}px;
`

export const Styled = {
  Rect,
  Round,
}
