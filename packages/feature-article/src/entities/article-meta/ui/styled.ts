import styled from 'styled-components'

import { Flex, textStyle } from '@my-interview/ui-kit'

const Card = styled(Flex)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r12}px;
`

const Keyword = styled.span`
  ${({ theme }) => textStyle(theme.typography.planFeature)}
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.85;
`

const LevelValue = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.badge)}
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  color: ${({ theme }) => theme.colors.white};
  height: 20px;
`

const Divider = styled.hr`
  background: ${({ theme }) => theme.colors.border};
  border: 0;
  height: 1px;
  margin: ${({ theme }) => theme.spacings.s4}px 0;
`

const Subscribe = styled.p`
  ${({ theme }) => textStyle(theme.typography.planNote)}
  background: ${({ theme }) => theme.colors.accentBg};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ theme }) => theme.colors.textPrimary};
  padding: ${({ theme }) => theme.spacings.s12}px;
`

const SubscribeMark = styled.a`
  color: ${({ theme }) => theme.colors.accent};
  font-weight: 500;
  text-decoration: underline;
`

export const Styled = {
  Card,
  Divider,
  Keyword,
  LevelValue,
  Subscribe,
  SubscribeMark,
}
