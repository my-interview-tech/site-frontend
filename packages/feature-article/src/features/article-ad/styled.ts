import styled from 'styled-components'

const Ad = styled.div`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  padding: ${({ theme }) => theme.spacings.s12}px;
`

const AdSlot = styled.div`
  background: ${({ theme }) => theme.colors.canvas};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  height: 400px;
  margin-top: ${({ theme }) => theme.spacings.s8}px;
`

const Placeholder = styled.div`
  background: ${({ theme }) => theme.colors.border};
  border: 1px dashed ${({ theme }) => theme.colors.borderStrong};
  border-radius: ${({ theme }) => theme.radii.r8}px;
  height: 400px;
`

export const Styled = {
  Ad,
  AdSlot,
  Placeholder,
}
