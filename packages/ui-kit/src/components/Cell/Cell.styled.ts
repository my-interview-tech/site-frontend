import styled, { css } from 'styled-components'

import { theme } from '../../theme/theme'
import { Flex } from '../Flex'

const Root = styled(Flex)<{ $isHoverable: boolean }>`
  ${({ $isHoverable }) =>
    $isHoverable &&
    css`
      transition: background-color 200ms ease;

      &:hover {
        background: ${theme.colors.glass};
      }
    `}
`

const Center = styled(Flex)`
  min-width: 0;
`

export const Styled = {
  Center,
  Root,
}
