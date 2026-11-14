import { Badge, Flex, Icon, Link, Text, theme } from '@my-interview/ui-kit'

import { TEXT } from '@roadmap/shared/constants'

import { featureToggles } from './constants'
import { toneOf } from './helpers'
import { Styled } from './styled'
import type { TopicCardProps } from './types'

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
          <Styled.Name color={theme.colors.ink} font={500} weight="semibold">
            {topic.title}
          </Styled.Name>

          {topic.soon && <Badge color="redOutline">{TEXT.SOON}</Badge>}
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

      {featureToggles.known && (
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
      )}
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

      {!isFluid && hasDescription && (
        <Styled.Tip color={theme.colors.surface} font={200} role="tooltip">
          {topic.description}
        </Styled.Tip>
      )}
    </Styled.Stack>
  )
}
