import styled from 'styled-components'

import { Flex, textStyle, theme } from '@my-interview/ui-kit'

const Intro = styled.div`
  align-items: center;
  background: ${theme.colors.surface};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.r16}px;
  display: grid;
  gap: ${theme.spacings.s32}px;
  grid-template-columns: minmax(0, 1fr);
  padding: ${theme.spacings.s32}px;
  width: 100%;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    grid-template-columns: minmax(220px, 1fr) minmax(160px, 420px);
  }
`

const IntroCopy = styled(Flex)`
  min-width: 0;
`

const Fact = styled.span`
  ${textStyle(200)}
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radii.rPill}px;
  color: ${theme.colors.textSecondary};
  padding: ${theme.spacings.s4}px ${theme.spacings.s12}px;
`

const Figure = styled.figure`
  margin: 0;
  min-width: 0;
  width: 100%;
`

export const Styled = {
  Fact,
  Figure,
  Intro,
  IntroCopy,
}
