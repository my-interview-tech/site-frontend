import { Markdown, ResourceCard } from '@my-interview/common'
import { Carousel, Flex, IconButton, Link, Text, Title, theme, useBreakpoint } from '@my-interview/ui-kit'

import { INTERVAL_MS, TEXT, WINDOW_SIZE } from '../constants'
import type { ArticleBodyProps } from '../types'
import { Styled } from './styled'

/**
 * Блок тела статьи: текст, материалы и соседние статьи.
 */
export const ArticleBody = ({ markdown, paywall, resources = [], previousStep, nextStep }: ArticleBodyProps) => {
  const { isMobile } = useBreakpoint()
  const visible = isMobile ? 1 : WINDOW_SIZE

  return (
    <Flex flexDirection="column" gap={theme.spacings.s24} style={{ minWidth: 0 }}>
      <Markdown>{markdown}</Markdown>

      {/* TODO: Добавить эффект затемнения для закрытой части статьи */}
      {paywall}

      {resources.length > 0 && (
        <Styled.Resources
          flexDirection="column"
          forwardedAs="section"
          gap={theme.spacings.s16}
          id="resources"
          p={theme.spacings.s20}
        >
          <Title size={700} title={TEXT.RESOURCES_TITLE} titleAs="h2" />

          <Carousel
            getDotLabel={(index) => `Материалы, страница ${index + 1}`}
            interval={INTERVAL_MS}
            items={resources}
            renderItem={(props) => <ResourceCard {...props} />}
            visible={visible}
          />
        </Styled.Resources>
      )}

      <Flex
        as="nav"
        flexDirection="column"
        gap={theme.spacings.s16}
        justifyContent="space-between"
        tablet={{ alignItems: 'flex-start', flexDirection: 'row' }}
      >
        {previousStep && (
          <Styled.PageLink
            $align="left"
            alignItems="center"
            forwardedAs={Link}
            gap={theme.spacings.s14}
            href={previousStep.href}
          >
            <IconButton
              aria-hidden
              as="span"
              iconDirection="left"
              iconSrc="icon-chevron"
              label={TEXT.PREVIOUS_STEP}
              size={32}
            />

            <Flex flexDirection="column" gap={theme.spacings.s4}>
              <Text as="span" color={theme.colors.textTertiary} font={200}>
                {TEXT.PREVIOUS_STEP}
              </Text>
              <Text as="span" color={theme.colors.textPrimary} font={500} weight="semibold">
                {previousStep?.title}
              </Text>
            </Flex>
          </Styled.PageLink>
        )}

        {nextStep && (
          <Styled.PageLink
            $align="right"
            alignItems="center"
            forwardedAs={Link}
            gap={theme.spacings.s14}
            href={nextStep.href}
          >
            <Flex flexDirection="column" gap={theme.spacings.s4}>
              <Text as="span" color={theme.colors.textTertiary} font={200}>
                {TEXT.NEXT_STEP}
              </Text>
              <Text as="span" color={theme.colors.textPrimary} font={500} weight="semibold">
                {nextStep?.title}
              </Text>
            </Flex>

            <IconButton aria-hidden as="span" iconSrc="icon-chevron" label={TEXT.NEXT_STEP} size={32} />
          </Styled.PageLink>
        )}
      </Flex>
    </Flex>
  )
}
