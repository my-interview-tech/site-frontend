import styled from 'styled-components'

import { Link, Text, theme } from '@my-interview/ui-kit'

const Paragraph = styled(Text)`
  overflow-wrap: anywhere;

  em {
    font-style: italic;
  }

  strong {
    color: ${theme.colors.accent};
    font-weight: ${theme.fontWeights.bold};
  }
`

const Anchor = styled(Link)`
  color: ${theme.colors.accent};
  font-weight: ${theme.fontWeights.medium};
  text-decoration: underline;
`

const Quote = styled.blockquote`
  border-left: 2px solid ${theme.colors.accent};
  color: ${theme.colors.textSecondary};
  margin: 0;
  padding-left: ${theme.spacings.s16}px;
`

const TableScroll = styled.div`
  max-width: 100%;
  overflow-x: auto;
  width: 100%;
`

const Table = styled.table`
  border-collapse: collapse;
  min-width: 100%;
  width: max-content;
`

const Cell = styled.td`
  border-bottom: 1px solid ${theme.colors.border};
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  text-align: left;
  vertical-align: top;
`

const HeadCell = styled.th`
  border-bottom: 1px solid ${theme.colors.border};
  font-weight: ${theme.fontWeights.semibold};
  padding: ${theme.spacings.s8}px ${theme.spacings.s12}px;
  text-align: left;
  vertical-align: top;
`

export const Styled = {
  Anchor,
  Cell,
  HeadCell,
  Paragraph,
  Quote,
  Table,
  TableScroll,
}
