import { pluralize } from '@my-interview/common'
import { Badge, Button, Flex, Icon, Image, Text, theme } from '@my-interview/ui-kit'

import { clockOf } from '@quiz/shared/lib'

import { FACTS, QUESTION_FORMS, TEXT } from '../constants'
import type { QuizIntroProps } from '../types'
import { Styled } from './styled'

/**
 * Описание квиза перед вопросами.
 */
export const QuizIntro = ({
  checks,
  isContinuation,
  isStarting,
  onBegin,
  questionCount,
  title,
  totalSeconds,
}: QuizIntroProps) => (
  <Styled.Intro>
    <Styled.IntroCopy flexDirection="column" gap={theme.spacings.s16}>
      <Flex alignItems="center" gap={theme.spacings.s12}>
        <Icon iconSrc="icon-react" size={40} />
        <Text as="h1" color={theme.colors.textPrimary} font={900} weight="semibold">
          {title}
        </Text>
      </Flex>
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
          {TEXT.CHECKS}
        </Text>
        <Flex as="ol" flexDirection="column" gap={theme.spacings.s8}>
          {checks.map((item) => (
            <Text key={item} as="li" color={theme.colors.textSecondary} font={400}>
              {item}
            </Text>
          ))}
        </Flex>
      </Flex>
      <Flex alignItems="center" flexWrap="wrap" gap={theme.spacings.s8}>
        {FACTS.map((item) => (
          <Styled.Fact key={item}>{item}</Styled.Fact>
        ))}
        <Badge color="green">{pluralize(questionCount, QUESTION_FORMS)}</Badge>
        <Badge color="green">{clockOf(totalSeconds)}</Badge>
      </Flex>
      <Button fullWidth isLoading={isStarting} type="button" variant="primary" onClick={onBegin}>
        {isContinuation ? TEXT.CONTINUE_QUIZ : TEXT.START}
      </Button>
    </Styled.IntroCopy>
    <Styled.Figure>
      <Image
        alt=""
        aspectRatio="512 / 394"
        height="auto"
        maxHeight="100%"
        src="/src/images/quiz-think.png"
        width="100%"
      />
    </Styled.Figure>
  </Styled.Intro>
)
