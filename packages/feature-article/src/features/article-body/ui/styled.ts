import styled, { css } from 'styled-components'

import { belowTablet, Flex } from '@my-interview/ui-kit'

const Resources = styled.section`
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r16}px;
  padding: ${({ theme }) => theme.spacings.s20}px;
  scroll-margin-top: ${({ theme }) => theme.spacings.s96}px;
`

const Row = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacings.s12}px;
  grid-template-columns: repeat(3, minmax(0, 1fr));

  ${({ theme }) => belowTablet(theme)} {
    grid-template-columns: minmax(0, 1fr);
  }
`

const Fade = styled.div`
  background: linear-gradient(to bottom, transparent, ${({ theme }) => theme.colors.page});
  height: ${({ theme }) => theme.spacings.s40}px;
  margin-top: -${({ theme }) => theme.spacings.s48}px;
  pointer-events: none;
  position: relative;
`

const PageLink = styled(Flex)<{ $align: 'left' | 'right' }>`
  max-width: 306px;
  text-decoration: none;

  ${({ $align }) =>
    $align === 'right' &&
    css`
      margin-left: auto;
      text-align: right;
    `}

  ${({ theme }) => belowTablet(theme)} {
    margin-left: 0;
    max-width: none;
  }
`

const PageChevron = styled(Flex)`
  border: 1px solid ${({ theme }) => theme.colors.accentBorder};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.textSecondary};
  height: 32px;
`

const Placeholder = styled.span`
  background: ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.r10}px;
  display: block;
  height: 120px;
`

const Dot = styled.span<{ $active: boolean }>`
  background: ${({ $active, theme }) => ($active ? theme.colors.borderStrong : theme.colors.border)};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  height: 8px;
  width: 8px;
`

export const Styled = {
  Dot,
  Fade,
  PageChevron,
  PageLink,
  Placeholder,
  Resources,
  Row,
}
