import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Banner = styled(Flex)`
  background: ${theme.colors.accentBg};
  border-bottom: 1px solid ${theme.colors.accentBorder};
  border-top: 1px solid ${theme.colors.accentBorder};
  min-height: 96px;

  &:last-child {
    border-bottom: 0;
  }
`

const BannerIcon = styled(Flex)`
  background: ${theme.colors.accent};
  border-radius: ${theme.radii.rPill}px;
  color: ${theme.colors.white};
  height: 40px;
`

const BannerCopy = styled(Flex)`
  min-width: 0;
`

export const Styled = {
  Banner,
  BannerCopy,
  BannerIcon,
}
