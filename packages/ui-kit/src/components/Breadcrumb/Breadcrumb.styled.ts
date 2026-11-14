import styled from 'styled-components'

import { textStyle } from '../../theme/textStyle'
import { theme } from '../../theme/theme'
import { Link } from '../Link'

const Component = styled.nav`
  ${textStyle(400)}
  align-items: baseline;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacings.s8}px;
  min-width: 0;
  width: 100%;
`

const CrumbLink = styled(Link)`
  color: ${theme.colors.textTertiary};
  flex-shrink: 0;
  text-decoration: none;

  &:hover {
    color: ${theme.colors.accent};
  }
`

const Current = styled.span`
  color: ${theme.colors.textSecondary};
  max-width: 100%;
`

const Separator = styled.span`
  color: ${theme.colors.textTertiary};
  flex-shrink: 0;
`

export const Styled = {
  CrumbLink,
  Current,
  Component,
  Separator,
}
