import styled from 'styled-components'

import { Flex, Text, theme } from '@my-interview/ui-kit'

const Frame = styled.div`
  display: flex;
  flex-direction: column;

  .tok-keyword {
    color: ${theme.colors.codeTag};
  }

  .tok-string {
    color: ${theme.colors.success};
  }

  .tok-number,
  .tok-type {
    color: ${theme.colors.blue};
  }

  .tok-comment {
    color: ${theme.colors.codeComment};
    font-style: italic;
  }

  .tok-function {
    color: ${theme.colors.accentDeep};
  }

  .tok-tag {
    color: ${theme.colors.danger};
  }

  .tok-attribute {
    color: ${theme.colors.badgeTask};
  }

  .tok-punctuation {
    color: ${theme.colors.textSecondary};
  }
`

const Header = styled(Flex)`
  background: ${theme.colors.codeHeader};
  border: 1px solid ${theme.colors.codeBorder};
  border-bottom: 0;
  border-radius: ${theme.radii.r10}px ${theme.radii.r10}px 0 0;

  & + pre {
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }
`

const Caption = styled(Flex)`
  min-width: 0;
`

const Title = styled(Text)`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

export const Styled = {
  Caption,
  Frame,
  Header,
  Title,
}
