import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Form = styled(Flex)`
  margin: 0 auto;
  max-width: 720px;
  width: 100%;
`

const Head = styled(Flex)`
  min-width: 0;
`

const Option = styled.button<{ $selected: boolean }>`
  ${textStyle(400)}
  background: ${({ $selected }) => ($selected ? theme.colors.accentBg : theme.colors.surface)};
  border: 1px solid ${({ $selected }) => ($selected ? theme.colors.accent : theme.colors.border)};
  border-radius: ${theme.radii.r10}px;
  color: ${theme.colors.textPrimary};
  cursor: pointer;
  padding: ${theme.spacings.s14}px ${theme.spacings.s16}px;
  text-align: left;
  width: 100%;

  ${`@media (hover: hover) and (min-width: ${theme.breakpoints.tablet}px)`} {
    &:hover {
      border-color: ${theme.colors.accent};
    }
  }
`

const ErrorText = styled.p`
  ${textStyle(200)}
  color: ${theme.colors.danger};
  margin: 0;
`

export const Styled = {
  ErrorText,
  Form,
  Head,
  Option,
}
