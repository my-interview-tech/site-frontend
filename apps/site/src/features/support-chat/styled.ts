import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  bottom: ${theme.spacings.s36}px;
  position: fixed;
  right: calc(${theme.spacings.s24}px + var(--guest-scrollbar-gap, 0px));
  z-index: 60;
`

const ChatButton = styled(Flex)`
  background: ${theme.colors.accent};
  border: 0;
  border-radius: ${theme.radii.rPill}px;
  box-shadow: ${theme.shadows.accent};
  cursor: pointer;
  height: 56px;
  width: 56px;
`

const Banner = styled(Flex)`
  ${textStyle(400)}
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.rPill}px;
  box-shadow: ${theme.shadows.lg};
  color: ${theme.colors.accent};
  max-width: calc(100vw - ${theme.container.paddingMobile * 2}px);
  padding: ${theme.spacings.s8}px ${theme.spacings.s8}px ${theme.spacings.s8}px ${theme.spacings.s16}px;
  transform: translateY(-${theme.spacings.s12}px);

  @media (min-width: ${theme.breakpoints.tablet}px) {
    max-width: calc(100vw - ${theme.container.paddingTablet * 2}px);
  }

  @media (min-width: ${theme.breakpoints.desktopS}px) {
    max-width: none;
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
