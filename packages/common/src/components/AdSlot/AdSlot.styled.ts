import styled, { css } from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const toCssSize = (value: number | string): string => (typeof value === 'number' ? `${value}px` : value)

const Slot = styled(Flex)<{ $height: number | string; $isFullscreen: boolean; $width: number | string }>`
  background: ${({ $isFullscreen }) => ($isFullscreen ? theme.colors.surface : 'transparent')};
  border: 1px dashed ${theme.colors.borderStrong};
  border-radius: ${({ $isFullscreen }) => ($isFullscreen ? 0 : theme.radii.r16)}px;
  height: ${({ $height }) => toCssSize($height)};
  width: ${({ $width }) => toCssSize($width)};

  ${({ $isFullscreen }) =>
    $isFullscreen &&
    css`
      inset: 0;
      position: fixed;
      z-index: 20;
    `}
`

const Close = styled.div`
  position: absolute;
  right: ${theme.spacings.s16}px;
  top: ${theme.spacings.s16}px;
`

const Copy = styled.div`
  max-width: 100%;
`

export const Styled = {
  Close,
  Copy,
  Slot,
}
