import { Card } from '@my-interview/common'
import { Chip, Divider, Flex, Link, Text, theme, useBreakpoint } from '@my-interview/ui-kit'

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
  const { isMobile } = useBreakpoint()
  const skills = skill?.join(', ')

  if (!inDrawer && isMobile) {
    return null
  }

  return (
    <Card as="section" flexDirection="column" gap={theme.spacings.s10} p={theme.spacings.s20} radius={12}>
      {skills && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          {!inDrawer && (
            <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
              {skillLabel}
            </Text>
          )}
          <Chip variant="rect">{skills}</Chip>
        </Flex>
      )}

      {keywords?.length && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
            {LABELS.KEYWORDS}
          </Text>

          <Flex flexWrap="wrap" gap={theme.spacings.s8}>
            {keywords.map((keyword) => (
              <Chip key={keyword} variant="rect">
                {keyword}
              </Chip>
            ))}
          </Flex>
        </Flex>
      )}

      {(importance || complexity) && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
            {LABELS.LEVEL}
          </Text>

          {importance && (
            <Flex alignItems="center" gap={theme.spacings.s6}>
              <Text as="span" color={theme.colors.textSecondary} font={300}>
                {LABELS.IMPORTANCE}
              </Text>
              <Styled.LevelValue inline alignItems="center" justifyContent="center" width={20}>
                {importance}
              </Styled.LevelValue>
            </Flex>
          )}

          {complexity && (
            <Flex alignItems="center" gap={theme.spacings.s6}>
              <Text as="span" color={theme.colors.textSecondary} font={300}>
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
          <Divider />

          <Styled.Subscribe p={theme.spacings.s12}>
            <Text as="p" color={theme.colors.textPrimary} font={300}>
              Подписаться на{' '}
              <Text
                as={Link}
                color={theme.colors.accent}
                font={300}
                href={subscribe.href}
                rel="noopener noreferrer"
                target="_blank"
                weight="medium"
              >
                {subscribe.label}
              </Text>
            </Text>
          </Styled.Subscribe>
        </>
      )}
    </Card>
  )
}
