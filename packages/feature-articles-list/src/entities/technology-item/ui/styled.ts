import styled, { css } from 'styled-components'

import { Flex, IndicatorButton, textStyle, theme } from '@my-interview/ui-kit'

import type { TechnologyItemStatus } from '../types'

const statusTone = {
  default: css`
    border: 1.5px solid ${theme.colors.borderStrong};
  `,
  locked: css`
    color: ${theme.colors.textPrimary};
    height: auto;
    width: auto;
  `,
  studied: css`
    background: ${theme.colors.badgeQuiz};
    color: ${theme.colors.white};
  `,
}

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${theme.colors.border};
  display: grid;
  gap: ${theme.spacings.s8}px;
  grid-template-columns: 20px minmax(0, 1fr) auto auto 32px;
  height: auto;
  min-height: 50px;
  padding: 9px ${theme.spacings.s12}px;
  position: relative;
  scroll-margin-top: ${theme.spacings.s96}px;

  @media (min-width: ${theme.breakpoints.tablet}px) {
    height: 50px;
    min-height: auto;
  }

  @media (hover: hover) {
    &:hover:has(a) {
      background: ${theme.colors.chip};
    }
  }

  &:last-child {
    border-bottom: 0;
  }
`

const title = css`
  ${textStyle(500)}
  color: ${theme.colors.textPrimary};
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Title = styled.span`
  ${title}
`

const TitleLink = styled.a`
  ${title}
  text-decoration: none;

  &::after {
    content: '';
    inset: 0;
    position: absolute;
  }
`

const Bookmark = styled(IndicatorButton)`
  z-index: 1;
`

const Status = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  position: relative;
  width: 32px;
  z-index: 1;
`

const StatusMark = styled(Flex)<{ $status: TechnologyItemStatus }>`
  border-radius: ${theme.radii.rPill}px;
  height: 20px;
  width: 20px;
  ${({ $status }) => statusTone[$status]}
`

const SkeletonRow = styled(Flex)`
  border-bottom: 1px solid ${theme.colors.border};
  height: 50px;
  padding: 0 ${theme.spacings.s16}px;

  &:last-child {
    border-bottom: 0;
  }
`

export const Styled = {
  Bookmark,
  Row,
  SkeletonRow,
  Status,
  StatusMark,
  Title,
  TitleLink,
}
