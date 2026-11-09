import { pluralize } from '@my-interview/common'
import { Flex, Image, Link, Progress, Text, theme } from '@my-interview/ui-kit'

import { QUESTION_FORMS, TEXT } from '../constants'
import type { RecommendationCardProps } from '../types'
import { Styled } from './styled'

/**
 * Карточка рекомендованной технологии: прогресс и ссылка.
 */
export const RecommendationCard = ({
  title,
  icon,
  label,
  inDrawer = false,
  questionCount,
  studiedCount,
  progress,
  href,
  cta,
}: RecommendationCardProps) => (
  <Styled.Card $inDrawer={inDrawer} flexDirection="column" gap={theme.spacings.s8} p={theme.spacings.s16}>
    {!inDrawer && (
      <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
        {label}
      </Text>
    )}

    <Flex alignItems="center" gap={theme.spacings.s8}>
      {icon && <Image alt="" height={24} src={icon} width={24} />}
      <Text as="p" color={theme.colors.textPrimary} font={500} weight="semibold">
        {title}
      </Text>
    </Flex>

    <Text as="p" color={theme.colors.textSecondary} font={200}>
      {`${pluralize(questionCount, QUESTION_FORMS)} · ${studiedCount} ${TEXT.STUDIED}`}
    </Text>

    <Progress label={TEXT.PROGRESS} value={progress} />

    <Flex>
      <Text as={Link} color={theme.colors.accent} font={400} href={href} weight="semibold">
        {cta}
      </Text>
    </Flex>
  </Styled.Card>
)
