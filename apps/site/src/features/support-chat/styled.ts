import styled from 'styled-components'

import { belowTablet, Flex, tabletOnly, textStyle } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  bottom: ${({ theme }) => theme.spacings.s36}px;
  position: fixed;
  right: calc(${({ theme }) => theme.spacings.s24}px + var(--guest-scrollbar-gap, 0px));
  z-index: 60;
`

const ChatButton = styled(Flex)`
  background: ${({ theme }) => theme.colors.accent};
  border: 0;
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  box-shadow: ${({ theme }) => theme.shadows.chat};
  cursor: pointer;
  height: 56px;
  width: 56px;
`

const Banner = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.body)}
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  box-shadow: ${({ theme }) => theme.shadows.cookie};
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacings.s8}px ${({ theme }) => theme.spacings.s8}px
    ${({ theme }) => theme.spacings.s8}px ${({ theme }) => theme.spacings.s16}px;
  transform: translateY(-${({ theme }) => theme.spacings.s12}px);

  ${({ theme }) => tabletOnly(theme)} {
    max-width: calc(100vw - ${({ theme: next }) => next.layout.pageGutterTablet * 2}px);
  }

  ${({ theme }) => belowTablet(theme)} {
    max-width: calc(100vw - ${({ theme: next }) => next.layout.pageGutterMobile * 2}px);

    span {
      min-width: 0;
    }
  }

  strong {
    font-weight: 500;
  }
`

export const Styled = {
  Banner,
  ChatButton,
  Container,
}
