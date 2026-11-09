import styled from 'styled-components'
import { theme } from '@my-interview/ui-kit'

const Container = styled.div`
  background: ${theme.colors.page};
  min-height: 100dvh;
  padding-bottom: ${theme.spacings.s48}px;
  padding-top: ${theme.spacings.s96}px;
`

export const Styled = {
  Container,
}
