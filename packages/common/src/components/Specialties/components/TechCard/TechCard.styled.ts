import styled, { css } from 'styled-components'

import { Button, Flex, Text, theme } from '@my-interview/ui-kit'

import { CARD_HEIGHT } from '../../Specialties.constants'

const card = css`
  && {
    align-items: center;
    background: ${theme.colors.surface};
    border: 1px solid ${theme.colors.borderCard};
    border-radius: ${theme.radii.r12}px;
    box-shadow: ${theme.shadows.sm};
    color: inherit;
    display: flex;
    gap: ${theme.spacings.s12}px;
    height: ${CARD_HEIGHT}px;
    justify-content: flex-start;
    padding: ${theme.spacings.s14}px;
    text-align: left;
    text-decoration: none;
    width: 100%;
  }
`

const Card = styled(Button)`
  ${card}

  @media (hover: hover) and (min-width: ${theme.breakpoints.tablet + 1}px) {
    &&:hover {
      border-color: ${theme.colors.accentLine};
      box-shadow: ${theme.shadows.md};
    }
  }
`

const Locked = styled(Button)`
  ${card}

  &&,
  &&:disabled {
    cursor: default;
    opacity: 0.55;
  }
`

const Mark = styled(Text)`
  align-items: center;
  background: ${theme.colors.accentBg};
  border-radius: ${theme.radii.r10}px;
  display: inline-flex;
  flex-shrink: 0;
  height: 40px;
  justify-content: center;
  width: 40px;
`

const TextColumn = styled(Flex)`
  min-width: 0;
`

const Name = styled(Text)`
  margin: 0;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Action = styled(Flex)`
  background: ${theme.colors.actionCell};
  border-radius: ${theme.radii.r8}px;
  height: 24px;
  width: 24px;
`

export const Styled = {
  Action,
  Card,
  Locked,
  Mark,
  Name,
  TextColumn,
}
