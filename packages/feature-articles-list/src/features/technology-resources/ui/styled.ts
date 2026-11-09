import styled from 'styled-components'

import { Card } from '@my-interview/common'
import { theme } from '@my-interview/ui-kit'

const Resources = styled(Card)`
  scroll-margin-top: ${theme.spacings.s96}px;
`

const SkeletonRow = styled.div`
  display: grid;
  gap: ${theme.spacings.s12}px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  @media (max-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: minmax(0, 1fr);
  }
`

export const Styled = {
  Resources,
  SkeletonRow,
}
