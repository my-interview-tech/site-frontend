import styled from 'styled-components'

type ComponentProps = { $color?: string; $rotation: string; $size: number; $src: string }

const Component = styled.span<ComponentProps>`
  background-color: currentcolor;
  color: ${({ $color }) => $color};
  display: inline-block;
  flex-shrink: 0;
  height: ${({ $size }) => $size}px;
  mask: url('${({ $src }) => $src}') center / contain no-repeat;
  transform: rotate(${({ $rotation }) => $rotation});
  transition: transform 200ms ease;
  width: ${({ $size }) => $size}px;

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Styled = {
  Component,
}
