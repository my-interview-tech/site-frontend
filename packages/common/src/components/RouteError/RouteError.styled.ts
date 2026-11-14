import styled, { css } from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Stage = styled(Flex)<{ $compact?: boolean; $overlay?: boolean }>`
  flex: ${({ $compact }) => ($compact ? 1 : 'none')};
  min-height: ${({ $compact }) => ($compact ? 'auto' : `calc(100vh - ${theme.spacings.s64}px)`)};

  ${({ $overlay }) =>
    $overlay &&
    css`
      background: ${theme.colors.scrim};
      inset: 0;
      min-height: 0;
      position: fixed;
      z-index: 60;
    `}
`

const Card = styled.section`
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.r16}px;
  box-shadow: ${theme.shadows.overlay};
  max-width: 480px;
  padding: ${theme.spacings.s32}px;
  position: relative;
  width: 100%;
`

const Close = styled.div`
  position: absolute;
  right: ${theme.spacings.s16}px;
  top: ${theme.spacings.s16}px;
`

const Copy = styled.div`
  text-align: center;
`

export const Styled = {
  Card,
  Close,
  Copy,
  Stage,
}
