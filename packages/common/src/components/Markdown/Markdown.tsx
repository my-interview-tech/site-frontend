import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

import { components } from './Markdown.config'
import type { MarkdownProps } from './Markdown.types'

/**
 * Текст статьи.
 *
 * @description
 * Разметку собирает сам компонент, потребитель её не стилизует.
 * Заголовок сохраняет уровень, хвост `{#id}` становится якорем.
 * Ограда становится `CodeBlock`: язык и хвост инфо-строки попадают в шапку.
 * Ссылка с адресом на `http` открывается в новой вкладке.
 */
export const Markdown = ({ children }: MarkdownProps) => (
  <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
    {children}
  </ReactMarkdown>
)
