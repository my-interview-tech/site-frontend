import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const List = styled(Flex)`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    ${textStyle(500)}
    color: ${theme.colors.textSecondary};
    padding-left: ${theme.spacings.s16}px;
    position: relative;

    &::before {
      background: ${theme.colors.accent};
      border-radius: ${theme.radii.rPill}px;
      content: '';
      height: 6px;
      left: 0;
      position: absolute;
      top: 10px;
      width: 6px;
    }

    strong {
      color: ${theme.colors.textPrimary};
      font-weight: 600;
    }
  }
`

export const Styled = {
  List,
}
