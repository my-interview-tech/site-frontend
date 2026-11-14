import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'

const Root = styled(Flex)`
  max-width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
`

const Tab = styled(ButtonBase)<{ $isSelected: boolean }>`
  ${textStyle(400, { weight: 'semibold' })}
  box-shadow: ${({ $isSelected }) => ($isSelected ? `inset 0 -2px 0 ${theme.colors.accent}` : 'none')};
  color: ${({ $isSelected }) => ($isSelected ? theme.colors.textPrimary : theme.colors.textTertiary)};
  flex-shrink: 0;
  padding: ${theme.spacings.s8}px 0;
  transition: color 0.15s ease;
  white-space: nowrap;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }

  &:hover {
    color: ${theme.colors.textPrimary};
  }
`

export const Styled = {
  Root,
  Tab,
}
