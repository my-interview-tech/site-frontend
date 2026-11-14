import { useMemo } from 'react'

import { Code, IconButton, Text, theme } from '@my-interview/ui-kit'

import { TEXT } from './CodeBlock.constants'
import { highlightSource, normalizeLanguage } from './CodeBlock.lib'
import { Styled } from './CodeBlock.styled'
import type { CodeBlockProps } from './CodeBlock.types'
import { useCopy } from './useCopy'

const { s4, s8, s16 } = theme.spacings

/**
 * Блок кода с подсветкой, шапкой и кнопкой копирования.
 *
 * @description Язык без парсера и пустой язык выводятся простым текстом. Шапка есть всегда: в ней кнопка копирования.
 */
export const CodeBlock = ({ children, lang = '', title }: CodeBlockProps) => {
  const language = normalizeLanguage(lang)
  const source = useMemo(() => highlightSource(children, language), [children, language])
  const { copy, isCopied } = useCopy(children)

  return (
    <Styled.Frame>
      <Styled.Header alignItems="center" gap={s8} justifyContent="space-between" p={`${s4}px ${s4}px ${s4}px ${s16}px`}>
        <Styled.Caption alignItems="baseline" gap={s8}>
          {Boolean(language) && (
            <Text as="span" color={theme.colors.textTertiary} font={200}>
              {language}
            </Text>
          )}

          {Boolean(title) && (
            <Styled.Title color={theme.colors.textSecondary} font={200} forwardedAs="span" title={title}>
              {title}
            </Styled.Title>
          )}
        </Styled.Caption>

        <IconButton
          iconSrc={isCopied ? 'icon-check' : 'icon-copy'}
          label={isCopied ? TEXT.copied : TEXT.copy}
          size={32}
          variant="text"
          onClick={copy}
        />
      </Styled.Header>
      <Code variant="block">{source}</Code>
    </Styled.Frame>
  )
}
