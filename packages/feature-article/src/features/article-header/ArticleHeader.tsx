import { useTheme } from 'styled-components'

import { Accordion, Cell, Flex, IconButton, Image, Text } from '@my-interview/ui-kit'

import { NavIcon } from '@shared/ui'

import { Styled } from './styled'
import type { ArticleHeaderProps } from './types'

/**
 * Шапка статьи.
 *
 * @description
 * - Доступный блок раскрывается аккордеоном с описанием вопроса и ожиданий.
 * - Недоступный блок остаётся ячейкой Cell того же размера.
 */
export const ArticleHeader = ({
  isSkillsOpen,
  onClick,
  imageSrc,
  title,
  caption,
  isAvailable,
  interview,
  result,
}: ArticleHeaderProps) => {
  const theme = useTheme()

  const ImageComponent = <Image alt="" height={48} src={imageSrc} width={48} />
  const ActionComponent = (
    <Styled.Action>
      <IconButton isOpen={isSkillsOpen} onClick={onClick}>
        <NavIcon />
      </IconButton>
    </Styled.Action>
  )

  if (!isAvailable) {
    return <Cell action={ActionComponent} mark={ImageComponent} title={title} caption={caption} />
  }

  return (
    <Accordion action={ActionComponent} mark={ImageComponent} title={title} caption={caption}>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
          {interview?.label}
        </Text>
        <Text as="p" color={theme.colors.textPrimary} font="leadStrong">
          {interview?.title}
        </Text>
        {interview.body && (
          <Text as="p" color={theme.colors.textSecondary} font="body">
            {interview?.body}
          </Text>
        )}
      </Flex>

      {result && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
            {result?.label}
          </Text>
          <Flex as="ol" flexDirection="column" gap={theme.spacings.s8}>
            {result?.items?.map((item) => (
              <Text key={item} as="li" color={theme.colors.textSecondary} font="body">
                {item}
              </Text>
            ))}
          </Flex>
        </Flex>
      )}
    </Accordion>
  )
}
