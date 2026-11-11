import { Button, Flex, IconButton, Text, theme } from '@my-interview/ui-kit'

import { TEXT } from '../constants'
import type { QuizQuestionProps } from '../types'
import { Styled } from './styled'

/**
 * Шаг квиза: вопрос и переход дальше.
 */
export const QuizQuestion = ({
  canGoBack,
  choice,
  description,
  error,
  footerLabel,
  navLabel,
  onBack,
  onFinish,
  onIntro,
  onPrimary,
  onSelect,
  steps,
  title,
  value,
}: QuizQuestionProps) => (
  <Styled.Form
    noValidate
    flexDirection="column"
    forwardedAs="form"
    gap={theme.spacings.s24}
    onSubmit={(event) => {
      event.preventDefault()
      onFinish()
    }}
  >
    <Styled.Head alignItems="center" gap={theme.spacings.s12}>
      <IconButton iconDirection="left" iconSrc="icon-chevron" label={TEXT.TO_INTRO} onClick={onIntro} />
      {steps}
    </Styled.Head>

    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <Text uppercase as="p" color={theme.colors.textTertiary} font={200} tracking="wide" weight="semibold">
        {navLabel}
      </Text>
      <Text as="h1" color={theme.colors.textPrimary} font={900} weight="semibold">
        {title}
      </Text>
      {description !== undefined && (
        <Text as="p" color={theme.colors.textSecondary} font={400}>
          {description}
        </Text>
      )}
    </Flex>

    {choice && (
      <Flex flexDirection="column" gap={theme.spacings.s12}>
        <Text as="h2" color={theme.colors.textPrimary} font={700} id={choice.id} weight="semibold">
          {choice.label}
        </Text>
        <Flex aria-labelledby={choice.id} flexDirection="column" gap={theme.spacings.s8} role="group">
          {choice.options.map((option) => (
            <Styled.Option
              key={option.id}
              $selected={value === option.id}
              aria-pressed={value === option.id}
              type="button"
              onClick={() => onSelect(option.id)}
            >
              {option.label}
            </Styled.Option>
          ))}
        </Flex>
        {error ? <Styled.ErrorText>{error}</Styled.ErrorText> : null}
      </Flex>
    )}

    <Flex gap={theme.spacings.s12} justifyContent="space-between">
      {canGoBack ? (
        <Button type="button" variant="text" onClick={onBack}>
          {TEXT.BACK}
        </Button>
      ) : (
        <span />
      )}
      <Button type="button" variant="primary" onClick={onPrimary}>
        {footerLabel ?? TEXT.CONTINUE}
      </Button>
    </Flex>
  </Styled.Form>
)
