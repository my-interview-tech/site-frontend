import styled from 'styled-components'

import { Flex, textStyle } from '@my-interview/ui-kit'

const Banner = styled(Flex)`
  background: ${({ theme }) => theme.colors.accentBg};
  border-bottom: 1px solid ${({ theme }) => theme.colors.accentBorder};
  border-top: 1px solid ${({ theme }) => theme.colors.accentBorder};
  min-height: 96px;

  &:last-child {
    border-bottom: 0;
  }
`

const BannerIcon = styled(Flex)`
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.white};
  height: 40px;
`

const BannerCopy = styled(Flex)`
  min-width: 0;
`

const BannerCta = styled(Flex)`
  ${({ theme }) => textStyle(theme.typography.button)}
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  color: ${({ theme }) => theme.colors.white};
  font-size: 13px;
  height: 32px;
  padding: 0 ${({ theme }) => theme.spacings.s16}px;
  text-decoration: none;
`

export const Styled = {
  Banner,
  BannerCopy,
  BannerCta,
  BannerIcon,
}
