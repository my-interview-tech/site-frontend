import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Check = styled.span`
  flex-shrink: 0;
  width: 14px;
`

const Benefits = styled(Flex)`
  margin: 0;
  padding: 0;
`

const PricePanel = styled(Flex)<{ $image?: string }>`
  background: ${({ $image }) =>
    $image
      ? `linear-gradient(to top, ${theme.colors.scrim}, transparent 70%), url(${$image}) center / cover no-repeat`
      : theme.colors.page};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r12}px;
  min-width: 0;
`

export const Styled = {
  Benefits,
  Check,
  PricePanel,
}
