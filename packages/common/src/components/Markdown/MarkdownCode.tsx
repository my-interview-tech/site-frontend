import { Children, isValidElement, type ReactElement, type ReactNode } from 'react'
import type { ExtraProps } from 'react-markdown'

import { CodeBlock } from '../CodeBlock'

import { fenceLanguage, fenceMeta } from './Markdown.lib'

/**
 * Ограда Markdown.
 * - Язык из класса вложенного `code`
 * - Название из хвоста инфо-строки
 * - Тело без хвостового перевода строки
 */
export const MarkdownCode = ({ children }: { children?: ReactNode }) => {
  const code = Children.toArray(children).find(isValidElement) as
    | ReactElement<{ children?: ReactNode; className?: string } & ExtraProps>
    | undefined
  const text = String(code?.props.children ?? '').replace(/\n$/, '')

  return (
    <CodeBlock lang={fenceLanguage(code?.props.className)} title={fenceMeta(code?.props.node?.data)}>
      {text}
    </CodeBlock>
  )
}
