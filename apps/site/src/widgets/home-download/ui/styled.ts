import styled from 'styled-components'

import { belowTablet, Flex, tabletOnly, textStyle } from '@my-interview/ui-kit'

const Card = styled(Flex)`
  min-height: 512px;

  ${({ theme }) => belowTablet(theme)} {
    min-height: 0;
  }
`

const Copy = styled(Flex)`
  max-width: 560px;

  ${({ theme }) => belowTablet(theme)} {
    max-width: none;
  }
`

const Stores = styled(Flex)`
  background: ${({ theme }) => theme.colors.storeCapsule};
  border: 1px solid ${({ theme }) => theme.colors.borderSoft};
  border-radius: ${({ theme }) => theme.radii.r14}px;
  padding: ${({ theme }) => theme.spacings.s6}px;
`

const Store = styled(Flex)`
  background: ${({ theme }) => theme.colors.store};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ theme }) => theme.colors.white};
  padding: 9px ${({ theme }) => theme.spacings.s16}px 9px ${({ theme }) => theme.spacings.s14}px;
  text-decoration: none;

  strong {
    ${({ theme }) => textStyle(theme.typography.storeName)}
    display: block;
  }
`

const Phone = styled.img`
  height: 500px;
  object-fit: contain;
  width: 500px;

  ${({ theme }) => tabletOnly(theme)} {
    height: auto;
    width: min(360px, 42%);
  }

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
    max-height: 320px;
    width: 100%;
  }
`

export const Styled = {
  Card,
  Copy,
  Phone,
  Store,
  Stores,
}
