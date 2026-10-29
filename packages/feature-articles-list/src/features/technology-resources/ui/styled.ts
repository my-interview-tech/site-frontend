import styled from 'styled-components'

import { Flex, belowTablet, textStyle } from '@my-interview/ui-kit'

const Resources = styled(Flex)`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  scroll-margin-top: ${({ theme }) => theme.spacings.s96}px;
`

const Title = styled.h2`
  ${({ theme }) => textStyle(theme.typography.cardTitle)}
  color: ${({ theme }) => theme.colors.textPrimary};
`

const SkeletonRow = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.s12}px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  ${({ theme }) => belowTablet(theme)} {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Styled = {
  Resources,
  SkeletonRow,
  Title,
}
