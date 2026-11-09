import { Flex, Icon, Link, Text, theme } from '@my-interview/ui-kit'

import type { Topic } from '../../lib/graph'

import { Styled } from './styled'

export type TopicCardProps = {
  /** Адрес темы. Без него карточка не ссылка: тема ещё не открыта. */
  href?: string
  /** Тема вне фильтра. */
  isDimmed: boolean
  /** Карточка на всю ширину, описание внутри вместо подсказки. */
  isFluid?: boolean
  /** Тема отмечена изученной в профиле. */
  isKnown: boolean
  topic: Topic
}

const toneOf = (isKnown: boolean, isDisabled: boolean) => {
  if (isKnown) {
    return 'known' as const
  }

  if (isDisabled) {
    return 'idle' as const
  }

  return 'gap' as const
}

/**
 * Карточка темы дорожной карты.
 *
 * @description
 * - С `href` — ссылка на тему, без него — приглушённая карточка без перехода.
 * - Описание в графе — подсказка по наведению и фокусу, в `isFluid` — строка под названием.
 */
export const TopicCard = ({ href, isDimmed, isFluid = false, isKnown, topic }: TopicCardProps) => {
  const isDisabled = !href
  const hasDescription = Boolean(topic.description)
  const body = (
    <>
      {topic.icon ? (
        <Icon iconSrc={topic.icon.replace(/\.svg$/, '')} size={40} />
      ) : (
        <Styled.Mark inline alignItems="center" flexShrink={0} forwardedAs="span" justifyContent="center">
          <Text color={theme.colors.accent} font={400} weight="semibold">
            {topic.title.slice(0, 1)}
          </Text>
        </Styled.Mark>
      )}
      <Styled.Copy flex={1} flexDirection="column" forwardedAs="span" gap={theme.spacings.s2}>
        <Flex alignItems="center" as="span" gap={theme.spacings.s6}>
          <Styled.Name>{topic.title}</Styled.Name>
          <Styled.Signal $tone={toneOf(isKnown, isDisabled)} />
        </Flex>
        {Boolean(topic.count) && (
          <Text color={theme.colors.muted} font={200}>
            {topic.count}
          </Text>
        )}
        {isFluid && hasDescription && (
          <Text color={theme.colors.textSecondary} font={200}>
            {topic.description}
          </Text>
        )}
      </Styled.Copy>
      <Styled.Know
        inline
        $isKnown={isKnown}
        alignItems="center"
        flexShrink={0}
        forwardedAs="span"
        justifyContent="center"
      >
        {isKnown && <Icon isMonochrome iconSrc="icon-check" size={10} />}
      </Styled.Know>
    </>
  )

  return (
    <Styled.Stack $isDimmed={isDimmed}>
      {href ? (
        <Styled.Root
          $isDisabled={false}
          $isFluid={isFluid}
          alignItems="center"
          forwardedAs={Link}
          gap={theme.spacings.s12}
          href={href}
          p={theme.spacings.s14}
        >
          {body}
        </Styled.Root>
      ) : (
        <Styled.Root
          $isDisabled
          aria-disabled
          $isFluid={isFluid}
          alignItems="center"
          gap={theme.spacings.s12}
          p={theme.spacings.s14}
        >
          {body}
        </Styled.Root>
      )}
      {!isFluid && hasDescription && <Styled.Tip role="tooltip">{topic.description}</Styled.Tip>}
    </Styled.Stack>
  )
}
