import type { ReactNode } from 'react'
import { createElement } from 'react'

import { StreamLanguage } from '@codemirror/language'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import type { Parser } from '@lezer/common'
import { parser as cssParser } from '@lezer/css'
import { highlightCode, tagHighlighter, tags } from '@lezer/highlight'
import { configureNesting, parser as htmlParser } from '@lezer/html'
import { parser as jsParser } from '@lezer/javascript'
import { parser as jsonParser } from '@lezer/json'

import { LANGUAGE_ALIAS } from './CodeBlock.constants'

const jsxParser = jsParser.configure({ dialect: 'jsx' })
const tsParser = jsParser.configure({ dialect: 'ts' })
const tsxParser = jsParser.configure({ dialect: 'jsx ts' })

const PARSERS: Record<string, Parser> = {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  bash: StreamLanguage.define(shell).parser,
  css: cssParser,
  html: htmlParser.configure({
    wrap: configureNesting([
      { parser: jsParser, tag: 'script' },
      { parser: cssParser, tag: 'style' },
    ]),
  }),
  js: jsParser,
  json: jsonParser,
  jsx: jsxParser,
  ts: tsParser,
  tsx: tsxParser,
  xml: htmlParser,
}

const highlighter = tagHighlighter([
  { class: 'tok-keyword', tag: [tags.keyword, tags.controlKeyword, tags.moduleKeyword, tags.definitionKeyword] },
  { class: 'tok-string', tag: [tags.string, tags.special(tags.string), tags.regexp] },
  { class: 'tok-number', tag: [tags.number, tags.bool, tags.null, tags.atom] },
  { class: 'tok-comment', tag: [tags.comment, tags.lineComment, tags.blockComment] },
  {
    class: 'tok-function',
    tag: [tags.function(tags.variableName), tags.function(tags.propertyName), tags.definition(tags.variableName)],
  },
  { class: 'tok-type', tag: [tags.typeName, tags.className] },
  { class: 'tok-tag', tag: [tags.tagName, tags.angleBracket] },
  { class: 'tok-attribute', tag: tags.attributeName },
  { class: 'tok-punctuation', tag: [tags.operator, tags.punctuation, tags.bracket] },
])

/** Язык ограды без регистра и синонимов: `JavaScript` и `node.js` дают `js`. */
export const normalizeLanguage = (lang: string): string => {
  const key = lang.trim().toLowerCase()

  return LANGUAGE_ALIAS[key] ?? key
}

/**
 * Парсер Lezer для языка.
 * `null` — язык без подсветки.
 */
export const getParser = (lang: string): Parser | null => PARSERS[lang] ?? null

/**
 * Код в `span` с классами `tok-*`.
 * Язык без парсера возвращается текстом как есть.
 */
export const highlightSource = (code: string, lang: string): ReactNode[] => {
  const parser = getParser(lang)

  if (!parser) {
    return [code]
  }

  const nodes: ReactNode[] = []

  highlightCode(
    code,
    parser.parse(code),
    highlighter,
    (text, classes) => {
      nodes.push(classes ? createElement('span', { className: classes, key: nodes.length }, text) : text)
    },
    () => {
      nodes.push('\n')
    }
  )

  return nodes
}
