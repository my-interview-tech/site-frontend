import styled from 'styled-components'

import { Flex, Text, theme } from '@my-interview/ui-kit'

const Container = styled(Flex)`
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.r32}px ${theme.radii.r32}px 0 0;
  box-shadow: ${theme.shadows.up};
  margin-top: -${theme.spacings.s32}px;
  min-height: ${`calc(100dvh + ${theme.spacings.s32}px)`};
`

const Heading = styled(Flex)`
  max-width: 720px;
`

const Description = styled(Text)`
  margin: 0;
`

const Columns = styled(Flex)`
  && {
    flex-direction: column;
  }

  @media (min-width: ${theme.breakpoints.tablet}px) {
    && {
      flex-direction: row;
    }
  }
`

const Catalog = styled(Flex)`
  min-width: 0;
`

const Toolbar = styled(Flex)`
  min-width: 0;
`

export const Styled = {
  Catalog,
  Columns,
  Container,
  Description,
  Heading,
  Toolbar,
}
