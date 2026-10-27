import { useTheme } from 'styled-components'

import { useMediaQuery } from '@my-interview/common'
import { Chip, Flex, Text } from '@my-interview/ui-kit'

import type { ArticleMetaProps } from '../types'
import { LABELS } from '../constants'
import { Styled } from './styled'

/**
 * Карточка навыка.
 */
export const ArticleMeta = ({
  inDrawer = false,
  skillLabel,
  skill,
  keywords,
  complexity,
  importance,
  subscribe,
}: ArticleMetaProps) => {
  const theme = useTheme()
  const compact = useMediaQuery(`(max-width: ${theme.breakpoints.tablet}px)`)
  const skills = skill?.join(', ')

  if (!inDrawer && compact) {
    return null
  }

  return (
    <Styled.Card flexDirection="column" forwardedAs="section" gap={theme.spacings.s10} p={theme.spacings.s20}>
      {skills && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          {!inDrawer && (
            <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
              {skillLabel}
            </Text>
          )}
          <Chip variant="label">{skills}</Chip>
        </Flex>
      )}

      {keywords?.length && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
            {LABELS.KEYWORDS}
          </Text>

          <Flex flexWrap="wrap" gap={theme.spacings.s8}>
            {keywords.map((keyword) => (
              <Styled.Keyword key={keyword}>{keyword}</Styled.Keyword>
            ))}
          </Flex>
        </Flex>
      )}

      {(importance || complexity) && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
            {LABELS.LEVEL}
          </Text>

          {importance && (
            <Flex alignItems="center" gap={theme.spacings.s6}>
              <Text as="span" color={theme.colors.textSecondary} font="planNote">
                {LABELS.IMPORTANCE}
              </Text>
              <Styled.LevelValue inline alignItems="center" justifyContent="center" width={20}>
                {importance}
              </Styled.LevelValue>
            </Flex>
          )}

          {complexity && (
            <Flex alignItems="center" gap={theme.spacings.s6}>
              <Text as="span" color={theme.colors.textSecondary} font="planNote">
                {LABELS.COMPLEXITY}
              </Text>
              <Styled.LevelValue inline alignItems="center" justifyContent="center" width={20}>
                {complexity}
              </Styled.LevelValue>
            </Flex>
          )}
        </Flex>
      )}

      {subscribe && (
        <>
          <Styled.Divider />

          <Styled.Subscribe>
            Подписаться на
            <Styled.SubscribeMark href={subscribe.href} rel="noopener noreferrer" target="_blank">
              {subscribe.label}
            </Styled.SubscribeMark>
          </Styled.Subscribe>
        </>
      )}
    </Styled.Card>
  )
}
