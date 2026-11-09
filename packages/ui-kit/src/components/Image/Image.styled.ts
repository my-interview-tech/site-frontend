import styled from 'styled-components'

const Component = styled.img<{ $height: number; $width: number }>`
  display: block;
  flex-shrink: 0;
  height: ${({ $height }) => $height}px;
  object-fit: contain;
  width: ${({ $width }) => $width}px;
`

const Picture = styled.picture`
  display: contents;
`

export const Styled = {
  Component,
  Picture,
}
