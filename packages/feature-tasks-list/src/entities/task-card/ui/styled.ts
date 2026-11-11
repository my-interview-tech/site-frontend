import styled, { css } from 'styled-components'

import { Card as CardBase } from '@my-interview/common'
import { Button, Flex, IconButton, Link, Text, textStyle, theme } from '@my-interview/ui-kit'

const Shrink = styled(Flex)`
  min-width: 0;
`

const OpenOffer = styled(Button)`
  && {
    align-items: center;
    background: transparent;
    border-radius: inherit;
    color: transparent;
    display: flex;
    inset: 0;
    justify-content: center;
    padding: 0;
    position: absolute;
    z-index: 2;
  }

  @media (hover: hover) {
    &&:hover {
      background: linear-gradient(${theme.colors.scrim}, ${theme.colors.scrim}), ${theme.colors.surface};
      color: ${theme.colors.textPrimary};
      z-index: 4;
    }
  }
`

const Bookmark = styled(IconButton)<{ $isActive: boolean }>`
  && {
    color: ${({ $isActive }) => ($isActive ? theme.colors.warning : theme.colors.textTertiary)};
    position: relative;
    z-index: 3;
  }

  &&:hover {
    color: ${theme.colors.warning};
  }
`

const Card = styled(CardBase)<{ $available: boolean }>`
  min-width: 0;
  overflow: hidden;
  position: relative;
  transition: border-color 0.15s ease;

  &:hover {
    border-color: ${theme.colors.borderStrong};
  }

  ${({ $available }) =>
    !$available &&
    css`
      color: ${theme.colors.textTertiary};

      > *:not(${OpenOffer}):not(${Shrink}) {
        filter: grayscale(1);
      }

      > ${Shrink} > *:not(${Shrink}) {
        filter: grayscale(1);
      }

      ${Bookmark} {
        filter: grayscale(1);
      }
    `}
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

export const Styled = {
  Bookmark,
  Card,
  OpenOffer,
  Shrink,
  Title,
  TitleLink,
}
