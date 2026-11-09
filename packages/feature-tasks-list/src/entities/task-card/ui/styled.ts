import styled, { css } from 'styled-components'

import { Card as CardBase } from '@my-interview/common'
import { Button, Flex, IconButton, Link, Text, textStyle, theme } from '@my-interview/ui-kit'

const Card = styled(CardBase)<{ $available: boolean }>`
  min-width: 0;
  position: relative;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${theme.colors.borderStrong};
  }

  ${({ $available }) =>
    !$available &&
    css`
      color: ${theme.colors.textTertiary};

      img,
      [role='img'] {
        filter: grayscale(1);
      }
    `}
`

const Shrink = styled(Flex)`
  min-width: 0;
`

const ellipsis = css`
  flex: 0 1 auto;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Title = styled(Text)`
  ${ellipsis}
`

const TitleLink = styled(Link)`
  ${textStyle(500, { weight: 'semibold' })}
  ${ellipsis}
  color: ${theme.colors.textPrimary};
  text-decoration: none;

  &::after {
    border-radius: inherit;
    content: '';
    inset: 0;
    position: absolute;
  }
`

const Bookmark = styled(IconButton)<{ $isActive: boolean }>`
  && {
    color: ${({ $isActive }) => ($isActive ? theme.colors.warning : theme.colors.textTertiary)};
    position: relative;
    z-index: 1;
  }

  &&:hover {
    color: ${theme.colors.warning};
  }
`

const OpenOffer = styled(Button)`
  && {
    color: transparent;
    height: auto;
    inset: 0;
    padding: 0;
    position: absolute;
  }
`

export const Styled = {
  Bookmark,
  Card,
  OpenOffer,
  Shrink,
  Title,
  TitleLink,
}
