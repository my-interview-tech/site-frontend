import styled from 'styled-components'

const Container = styled.div`
  background: ${({ theme }) => theme.colors.page};
  min-height: 100dvh;
  padding-bottom: ${({ theme }) => theme.spacings.s48}px;
  padding-top: ${({ theme }) => theme.spacings.s96}px;
`

export const Styled = {
  Container,
}
