import styled from 'styled-components'

import { belowTablet, Flex, tabletOnly } from '@my-interview/ui-kit'

const Row = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderStrong};
  padding-bottom: ${({ theme }) => theme.spacings.s48}px;

  & + & {
    margin-top: ${({ theme }) => theme.spacings.s48}px;
  }
`

const Media = styled.img`
  border-radius: ${({ theme }) => theme.radii.r10}px;
  flex-shrink: 0;
  height: 320px;
  object-fit: cover;
  width: 480px;

  ${({ theme }) => tabletOnly(theme)} {
    height: auto;
    max-height: 280px;
    width: min(480px, 42%);
  }

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
    width: 100%;
  }
`

export const Styled = {
  Media,
  Row,
}
