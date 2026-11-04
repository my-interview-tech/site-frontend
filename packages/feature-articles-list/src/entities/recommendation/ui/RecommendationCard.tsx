import { useTheme } from 'styled-components'

import { pluralize } from '@my-interview/common'
import { Image, Link, Text } from '@my-interview/ui-kit'

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
}: RecommendationCardProps) => {
  const theme = useTheme()

  return (
    <Styled.Card $inDrawer={inDrawer}>
      {!inDrawer && (
        <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
          {label}
        </Text>
      )}

      <Styled.Identity alignItems="center" gap={theme.spacings.s8}>
        {icon && <Image alt="" height={24} src={icon} width={24} />}
        <Text as="p" color={theme.colors.textPrimary} font="title">
          {title}
        </Text>
      </Styled.Identity>

      <Text as="p" color={theme.colors.textSecondary} font="caption" style={{ marginTop: theme.spacings.s4 }}>
        {`${pluralize(questionCount, QUESTION_FORMS)} · ${studiedCount} ${TEXT.STUDIED}`}
      </Text>

      <Styled.Track>
        <Styled.Fill $progress={progress} />
      </Styled.Track>

      <Styled.Link as={Link} href={href}>
        <Text as="span" color={theme.colors.accent} font="bodyStrong">
          {cta}
        </Text>
      </Styled.Link>
    </Styled.Card>
  )
}
