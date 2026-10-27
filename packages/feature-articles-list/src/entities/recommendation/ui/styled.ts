import styled, { css } from 'styled-components'

import { Flex, belowTablet } from '@my-interview/ui-kit'

const Card = styled.div<{ $inDrawer: boolean }>`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  padding: ${({ theme }) => theme.spacings.s16}px;

  ${({ $inDrawer, theme }) =>
    !$inDrawer &&
    css`
      ${belowTablet(theme)} {
        display: none;
      }
    `}
`

const Identity = styled(Flex)`
  margin-top: ${({ theme }) => theme.spacings.s8}px;
  min-width: 0;
`

const Track = styled.div`
  background: ${({ theme }) => theme.colors.chip};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  height: 4px;
  margin-top: ${({ theme }) => theme.spacings.s12}px;
  overflow: hidden;
`

const Fill = styled.div<{ $progress: number }>`
  background: ${({ theme }) => theme.colors.accent};
  height: 100%;
  width: ${({ $progress }) => $progress}%;
`

const Link = styled.a`
  display: inline-block;
  margin-top: ${({ theme }) => theme.spacings.s12}px;
`

const Placeholder = styled(Flex)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r10}px;
`

export const Styled = {
  Card,
  Fill,
  Identity,
  Link,
  Placeholder,
  Track,
}
