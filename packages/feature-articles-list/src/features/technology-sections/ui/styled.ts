import styled from 'styled-components'

import { Flex, textStyle } from '@my-interview/ui-kit'

const Panel = styled(Flex)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  overflow: hidden;
`

const Section = styled(Flex)`
  scroll-margin-top: ${({ theme }) => theme.spacings.s96}px;
`

const Title = styled.h2`
  ${({ theme }) => textStyle(theme.typography.cardTitle)}
  color: ${({ theme }) => theme.colors.textPrimary};
`

export const Styled = {
  Panel,
  Section,
  Title,
}
