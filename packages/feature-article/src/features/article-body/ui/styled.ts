import styled, { css } from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Resources = styled(Card)`
  scroll-margin-top: ${theme.spacings.s96}px;
`

const Row = styled.div`
  display: grid;
  gap: ${theme.spacings.s12}px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

const PageLink = styled(Flex)<{ $align: 'left' | 'right' }>`
  max-width: 306px;
  text-decoration: none;

  ${({ $align }) =>
    $align === 'right' &&
    css`
      margin-left: auto;
      text-align: right;
    `}

  @media (max-width: ${theme.breakpoints.tablet}px) {
    margin-left: 0;
    max-width: none;
  }
`

export const Styled = {
  PageLink,
  Resources,
  Row,
}
