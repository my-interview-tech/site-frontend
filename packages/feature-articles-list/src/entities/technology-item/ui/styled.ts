import styled, { css } from 'styled-components'

import { Flex, belowTablet, textStyle } from '@my-interview/ui-kit'

import type { TechnologyItemStatus } from '../types'

const statusTone = {
  default: css`
    border: 1.5px solid ${({ theme }) => theme.colors.borderStrong};
  `,
  locked: css`
    color: ${({ theme }) => theme.colors.textPrimary};
    height: auto;
    width: auto;
  `,
  studied: css`
    background: ${({ theme }) => theme.colors.badgeQuiz};
    color: ${({ theme }) => theme.colors.white};
  `,
}

const Row = styled.div`
  align-items: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: grid;
  gap: ${({ theme }) => theme.spacings.s8}px;
  grid-template-columns: 20px minmax(0, 1fr) auto auto 32px;
  height: 50px;
  padding: 9px ${({ theme }) => theme.spacings.s12}px;

  &:last-child {
    border-bottom: 0;
  }

  ${({ theme }) => belowTablet(theme)} {
    height: auto;
    min-height: 50px;
  }
`

const Index = styled.span<{ $locked: boolean }>`
  ${({ theme }) => textStyle(theme.typography.body)}
  color: ${({ $locked, theme }) => ($locked ? theme.colors.textPrimary : theme.colors.textTertiary)};
  text-align: right;
`

const title = css`
  ${({ theme }) => textStyle(theme.typography.navLink)}
  color: ${({ theme }) => theme.colors.textPrimary};
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

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
  }
`

const square = css`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: inline-flex;
  height: 32px;
  justify-content: center;
  padding: 0;
  width: 32px;
`

const Bookmark = styled.button`
  ${square}
  border-radius: ${({ theme }) => theme.radii.r8}px;
  color: ${({ theme }) => theme.colors.textTertiary};
  position: relative;

  &:hover {
    background: ${({ theme }) => theme.colors.page};
    color: ${({ theme }) => theme.colors.textPrimary};
  }
`

const BookmarkCount = styled.span`
  ${({ theme }) => textStyle(theme.typography.micro)}
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  color: ${({ theme }) => theme.colors.white};
  min-width: 16px;
  padding: 0 ${({ theme }) => theme.spacings.s4}px;
  position: absolute;
  right: -2px;
  top: -2px;
`

const Status = styled.button`
  ${square}
`

const StatusMark = styled(Flex)<{ $status: TechnologyItemStatus }>`
  border-radius: ${({ theme }) => theme.radii.rPill}px;
  height: 20px;
  width: 20px;
  ${({ $status }) => statusTone[$status]}
`

const SkeletonRow = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  height: 50px;
  padding: 0 ${({ theme }) => theme.spacings.s16}px;

  &:last-child {
    border-bottom: 0;
  }
`

export const Styled = {
  Bookmark,
  BookmarkCount,
  Index,
  Row,
  SkeletonRow,
  Status,
  StatusMark,
  Title,
  TitleLink,
}
