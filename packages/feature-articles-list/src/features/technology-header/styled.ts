import styled from 'styled-components'

import { Flex, belowTablet } from '@my-interview/ui-kit'

const Action = styled.span`
  display: none;

  ${({ theme }) => belowTablet(theme)} {
    display: inline-flex;
  }
`

const Badges = styled(Flex)`
  ${({ theme }) => belowTablet(theme)} {
    display: none;
  }
`

const Section = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  padding: ${({ theme }) => theme.spacings.s16}px ${({ theme }) => theme.spacings.s20}px;
`

export const Styled = {
  Action,
  Badges,
  Section,
}
