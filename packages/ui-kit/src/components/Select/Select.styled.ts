import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import { ButtonBase } from '../ButtonBase'
import { Flex } from '../Flex'
import { MENU_MAX_HEIGHT, TRIGGER_HEIGHT } from './Select.constants'

const Field = styled.div`
  position: relative;
`

const Trigger = styled(ButtonBase)`
  ${textStyle(400)}
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textPrimary};
  gap: ${theme.spacings.s8}px;
  height: ${TRIGGER_HEIGHT}px;
  justify-content: space-between;
  padding: 0 ${theme.spacings.s12}px;
  width: 100%;

  &:hover,
  &[aria-expanded='true'] {
    border-color: ${theme.colors.borderStrong};
  }
`

const Summary = styled.span`
  min-width: 0;
  overflow: hidden;
  text-align: left;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Menu = styled(Flex)`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r10}px;
  box-shadow: ${theme.shadows.overlay};
  left: 0;
  margin-top: ${theme.spacings.s4}px;
  max-height: ${MENU_MAX_HEIGHT}px;
  overflow: auto;
  position: absolute;
  right: 0;
  z-index: 2;
`

const Option = styled(ButtonBase)`
  ${textStyle(400)}
  color: ${theme.colors.textPrimary};
  gap: ${theme.spacings.s8}px;
  justify-content: flex-start;
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  text-align: left;
  width: 100%;

  &[aria-selected='true'],
  &:hover {
    background: ${theme.colors.chip};
  }
`

const OptionLabel = styled.span`
  flex: 1;
  min-width: 0;
`

const Hint = styled.span`
  ${textStyle(200)}
  color: ${theme.colors.textTertiary};
`

export const Styled = {
  Field,
  Hint,
  Menu,
  Option,
  OptionLabel,
  Summary,
  Trigger,
}
