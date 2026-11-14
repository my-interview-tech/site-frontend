import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

import type { CardRadius } from './Card.types'

const RADIUS = {
  10: theme.radii.r10,
  12: theme.radii.r12,
  16: theme.radii.r16,
} satisfies Record<CardRadius, number>

const Root = styled(Flex)<{ $radius: CardRadius }>`
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${({ $radius }) => RADIUS[$radius]}px;
`

export const Styled = {
  Root,
}
