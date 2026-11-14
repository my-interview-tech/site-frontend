import styled from 'styled-components'

import { Flex, theme } from '@my-interview/ui-kit'

const Card = styled.section`
  background: ${theme.colors.surface};
  border-radius: ${theme.radii.r16}px;
  box-shadow: ${theme.shadows.overlay};
  margin: 0 auto;
  max-width: 480px;
  padding: ${theme.spacings.s32}px;
  width: 100%;
`

const Frame = styled(Flex)`
  min-height: ${`calc(100vh - ${theme.spacings.s96}px)`};
`

const Copy = styled.div`
  text-align: center;
  white-space: pre-line;
`

const Actions = styled(Flex)`
  margin-top: ${theme.spacings.s20}px;

  button {
    min-width: 120px;
  }
`

export const Styled = {
  Actions,
  Card,
  Copy,
  Frame,
}
