import type { Components } from 'react-markdown'

import { Code, Divider, theme } from '@my-interview/ui-kit'

import { AnchorHeading } from '../AnchorHeading'
import { ListBlock } from '../ListBlock'

import { HEADING_FONT } from './Markdown.constants'
import { MarkdownCode } from './MarkdownCode'
import { Styled } from './Markdown.styled'

export const components: Components = {
  /**
   * Заголовок 1-го уровня.
   */
  h1: ({ children }) => (
    <AnchorHeading as="h1" font={HEADING_FONT.h1}>
      {children}
    </AnchorHeading>
  ),

  /**
   * Заголовок 2-го уровня.
   */
  h2: ({ children }) => (
    <AnchorHeading as="h2" font={HEADING_FONT.h2}>
      {children}
    </AnchorHeading>
  ),

  /**
   * Заголовок 3-го уровня.
   */
  h3: ({ children }) => (
    <AnchorHeading as="h3" font={HEADING_FONT.h3}>
      {children}
    </AnchorHeading>
  ),
  /**
   * Заголовок 4-го уровня.
   */
  h4: ({ children }) => (
    <AnchorHeading as="h4" font={HEADING_FONT.h4}>
      {children}
    </AnchorHeading>
  ),

  /**
   * Заголовок 5-го уровня.
   */
  h5: ({ children }) => (
    <AnchorHeading as="h5" font={HEADING_FONT.h5}>
      {children}
    </AnchorHeading>
  ),

  /**
   * Заголовок 6-го уровня.
   */
  h6: ({ children }) => (
    <AnchorHeading as="h6" font={HEADING_FONT.h6}>
      {children}
    </AnchorHeading>
  ),

  /**
   * Ссылка.
   */
  a: ({ children, href }) =>
    href ? (
      <Styled.Anchor href={href} rel="noopener noreferrer" target={href.startsWith('http') ? '_blank' : undefined}>
        {children}
      </Styled.Anchor>
    ) : (
      children
    ),

  /**
   * Цитата.
   */
  blockquote: ({ children }) => <Styled.Quote>{children}</Styled.Quote>,

  /**
   * Код.
   */
  code: ({ children, className }) =>
    className ? <code className={className}>{children}</code> : <Code>{children}</Code>,

  /**
   * Горизонтальная линия.
   */
  hr: () => <Divider />,

  /**
   * Нумерованный список.
   */
  ol: ({ children }) => <ListBlock>{children}</ListBlock>,

  /**
   * Абзац.
   */
  p: ({ children }) => (
    <Styled.Paragraph color={theme.colors.textSecondary} font={500} forwardedAs="p">
      {children}
    </Styled.Paragraph>
  ),

  /**
   * Преформатированный текст.
   */
  pre: ({ children }) => <MarkdownCode>{children}</MarkdownCode>,

  /**
   * Таблица.
   */
  table: ({ children }) => <Styled.Table>{children}</Styled.Table>,

  /**
   * Ячейка таблицы.
   */
  td: ({ children }) => <Styled.Cell>{children}</Styled.Cell>,

  /**
   * Заголовок ячейки таблицы.
   */
  th: ({ children }) => <Styled.HeadCell>{children}</Styled.HeadCell>,

  /**
   * Маркированный список.
   */
  ul: ({ children }) => <ListBlock>{children}</ListBlock>,
}
