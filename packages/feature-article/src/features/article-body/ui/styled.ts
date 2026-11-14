import styled, { css } from 'styled-components'

import { Card } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

const Resources = styled(Card)`
  scroll-margin-top: ${theme.spacings.s96}px;
`

const Row = styled.div`
  display: grid;
  gap: ${theme.spacings.s12}px;
  grid-template-columns: minmax(0, 1fr);

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`

const Slot = styled.div<{ $height: number }>`
  min-height: ${({ $height }) => ($height > 0 ? `${$height}px` : '0')};
  overflow-anchor: none;
`

const Pager = styled(Flex)<{ $floating: boolean }>`
  ${({ $floating }) =>
    $floating &&
    css`
      background: ${theme.colors.surface};
      bottom: 0;
      box-shadow: ${theme.shadows.overlay};
      box-sizing: border-box;
      left: 0;
      padding: ${theme.spacings.s16}px ${theme.container.paddingMobile}px;
      position: fixed;
      right: 0;
      z-index: 30;
    `}
`

const PageLink = styled(Flex)<{ $align: 'left' | 'right' }>`
  max-width: none;
  text-decoration: none;

  ${({ $align }) =>
    $align === 'right' &&
    css`
      text-align: right;
    `}

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    max-width: 306px;

    ${({ $align }) =>
      $align === 'right' &&
      css`
        margin-left: auto;
      `}
  }
`

export const Styled = {
  PageLink,
  Pager,
  Resources,
  Row,
  Slot,
}
