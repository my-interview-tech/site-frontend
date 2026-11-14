import styled, { css } from 'styled-components'

type ComponentProps = {
  $color?: string
  $isMonochrome: boolean
  $rotation: string
  $size: number
  $src: string
}

const paint = ({ $color, $isMonochrome, $src }: ComponentProps) =>
  $isMonochrome
    ? css`
        background-color: currentcolor;
        color: ${$color};
        mask: url('${$src}') center / contain no-repeat;
      `
    : css`
        background: url('${$src}') center / contain no-repeat;
      `

const Component = styled.span<ComponentProps>`
  display: inline-block;
  flex-shrink: 0;
  height: ${({ $size }) => $size}px;
  transform: rotate(${({ $rotation }) => $rotation});
  transition: transform 200ms ease;
  width: ${({ $size }) => $size}px;
  ${paint}

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
`

export const Styled = {
  Component,
}
