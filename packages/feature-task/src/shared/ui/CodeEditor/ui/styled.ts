import styled from 'styled-components'

const Host = styled.div<{ $fill: boolean }>`
  height: ${({ $fill }) => ($fill ? '100%' : 'auto')};
  min-height: 0;
  width: 100%;

  .cm-editor {
    width: 100%;
  }
`

export const Styled = {
  Host,
}
