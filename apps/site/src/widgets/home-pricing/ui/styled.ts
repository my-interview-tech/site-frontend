import styled from 'styled-components'

import { Flex, Grid, Text, textStyle, theme } from '@my-interview/ui-kit'

const Header = styled(Flex)`
  text-align: center;
`

const Cards = styled(Grid)`
  gap: ${theme.spacings.s24}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    gap: ${theme.spacings.s24}px;
  }
`

const PlanCard = styled(Flex)<{ $highlighted: boolean }>`
  background: ${({ $highlighted }) => ($highlighted ? theme.colors.surface : theme.colors.surfaceAlt)};
  border: ${({ $highlighted }) =>
    $highlighted ? `1.5px solid ${theme.colors.accent}` : `1px solid ${theme.colors.borderCard}`};
  border-radius: ${theme.radii.r20}px;
  box-shadow: ${({ $highlighted }) => ($highlighted ? theme.shadows.lg : theme.shadows.sm)};
  height: 100%;
  padding: ${theme.spacings.s28}px ${theme.spacings.s24}px;
`

const OldPrice = styled(Text)`
  text-decoration: line-through;
`

const Feature = styled(Flex)<{ $included: boolean }>`
  ${({ $included }) => textStyle(300, { weight: $included ? 'medium' : 'regular' })}
  color: ${({ $included }) => ($included ? theme.colors.inkSoft : theme.colors.faint)};

  span {
    color: ${({ $included }) => ($included ? theme.colors.accent : theme.colors.disabled)};
  }
`

export const Styled = {
  Cards,
  Feature,
  Header,
  OldPrice,
  PlanCard,
}
