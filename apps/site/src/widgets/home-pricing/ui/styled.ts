import styled from 'styled-components'

import { Flex, Grid, Text, textStyle } from '@my-interview/ui-kit'

const Header = styled(Flex)`
  text-align: center;
`

const Cards = styled(Grid)`
  gap: ${({ theme }) => theme.spacings.s24}px;
  margin-right: 0;
  margin-left: 0;
  max-width: none;
  min-height: 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}px) {
    gap: ${({ theme }) => theme.spacings.s24}px;
    margin-right: 0;
    margin-left: 0;
    max-width: none;
  }
`

const PlanCard = styled(Flex)<{ $highlighted: boolean }>`
  background: ${({ $highlighted, theme }) => ($highlighted ? theme.colors.surface : theme.colors.surfaceAlt)};
  border: ${({ $highlighted, theme }) =>
    $highlighted ? `1.5px solid ${theme.colors.accent}` : `1px solid ${theme.colors.borderCard}`};
  border-radius: ${({ theme }) => theme.radii.r20}px;
  box-shadow: ${({ $highlighted, theme }) => ($highlighted ? theme.shadows.pricingHit : theme.shadows.pricing)};
  height: 100%;
  padding: ${({ theme }) => theme.spacings.s28}px ${({ theme }) => theme.spacings.s24}px;
`

const OldPrice = styled(Text)`
  text-decoration: line-through;
`

const Feature = styled(Flex)<{ $included: boolean }>`
  ${({ $included, theme }) => textStyle($included ? theme.typography.planFeature : theme.typography.planNote)}
  color: ${({ $included, theme }) => ($included ? theme.colors.inkSoft : theme.colors.faint)};

  span {
    color: ${({ $included, theme }) => ($included ? theme.colors.accent : theme.colors.disabled)};
  }
`

export const Styled = {
  Cards,
  Feature,
  Header,
  OldPrice,
  PlanCard,
}
