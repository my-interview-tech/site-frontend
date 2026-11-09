import styled from 'styled-components'

import { theme } from '../../theme/theme'
import { Flex } from '../Flex'

const Root = styled.button`
  align-items: center;
  appearance: none;
  background: none;
  border: 0;
  color: inherit;
  cursor: pointer;
  display: inline-flex;
  font: inherit;
  justify-content: center;
  margin: 0;
  padding: 0;
  position: relative;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;

  &:focus-visible {
    outline: 2px solid ${theme.colors.accent};
    outline-offset: 2px;
  }

  &:disabled,
  &[aria-disabled='true'] {
    cursor: not-allowed;
    opacity: 0.5;
  }

  &[aria-busy='true'] {
    cursor: progress;
    opacity: 1;
  }
`

const Content = styled.span`
  display: contents;
  visibility: hidden;
`

const Loader = styled(Flex)`
  inset: 0;
  position: absolute;
`

export const Styled = {
  Content,
  Loader,
  Root,
}
