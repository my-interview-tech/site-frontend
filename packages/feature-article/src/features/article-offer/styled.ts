import styled from 'styled-components'

import { Flex } from '@my-interview/ui-kit'

const Check = styled.span`
  flex-shrink: 0;
  width: 14px;
`

const Card = styled(Flex)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
`

const Benefits = styled(Flex)`
  margin: 0;
  padding: 0;
`

const PricePanel = styled(Flex)<{ $image?: string }>`
  background: ${({ $image, theme }) =>
    $image
      ? `linear-gradient(to top, ${theme.colors.scrim}, transparent 70%), url(${$image}) center / cover no-repeat`
      : theme.colors.page};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r12}px;
  min-width: 0;
`

export const Styled = {
  Benefits,
  Card,
  Check,
  PricePanel,
}
