import { useTheme } from 'styled-components'

import { Markdown, ResourceCard, useMediaQuery } from '@my-interview/common'
import { Carousel, Flex, Text } from '@my-interview/ui-kit'

import { ChevronIcon } from '@shared/ui'

import { INTERVAL_MS, TEXT, WINDOW_SIZE } from '../constants'
import type { ArticleBodyProps } from '../types'
import { Styled } from './styled'

/**
 * Блок тела статьи: текст, материалы и соседние статьи.
 */
export const ArticleBody = ({ markdown, paywall, resources = [], previousStep, nextStep }: ArticleBodyProps) => {
  const theme = useTheme()
  const compact = useMediaQuery(theme.breakpoints.tablet)
  const visible = compact ? 1 : WINDOW_SIZE

  return (
    <Flex flexDirection="column" gap={theme.spacings.s24} style={{ minWidth: 0 }}>
      <Markdown>{markdown}</Markdown>

      {/* TODO: Добавить эффект затемнения для закрытой части статьи */}
      {paywall}

      {resources.length > 0 && (
        <Styled.Resources id="resources">
          <Flex alignItems="center" style={{ minHeight: 32 }}>
            <Text as="h2" color={theme.colors.textPrimary} font="cardTitle">
              {TEXT.RESOURCES_TITLE}
            </Text>
          </Flex>

          <Carousel
            dotLabel={(index) => `Материалы, страница ${index + 1}`}
            interval={INTERVAL_MS}
            items={resources}
            nextLabel="Следующие материалы"
            previousLabel="Предыдущие материалы"
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
            forwardedAs="a"
            gap={theme.spacings.s14}
            href={previousStep.href}
          >
            <Styled.PageChevron inline alignItems="center" flexShrink={0} justifyContent="center" width={32}>
              <ChevronIcon direction="left" />
            </Styled.PageChevron>

            <Flex flexDirection="column" gap={theme.spacings.s4}>
              <Text as="span" color={theme.colors.textTertiary} font="caption">
                {TEXT.PREVIOUS_STEP}
              </Text>
              <Text as="span" color={theme.colors.textPrimary} font="techName">
                {previousStep?.title}
              </Text>
            </Flex>
          </Styled.PageLink>
        )}

        {nextStep && (
          <Styled.PageLink
            $align="right"
            alignItems="center"
            forwardedAs="a"
            gap={theme.spacings.s14}
            href={nextStep.href}
          >
            <Flex flexDirection="column" gap={theme.spacings.s4}>
              <Text as="span" color={theme.colors.textTertiary} font="caption">
                {TEXT.NEXT_STEP}
              </Text>
              <Text as="span" color={theme.colors.textPrimary} font="techName">
                {nextStep?.title}
              </Text>
            </Flex>

            <Styled.PageChevron inline alignItems="center" flexShrink={0} justifyContent="center" width={32}>
              <ChevronIcon direction="right" />
            </Styled.PageChevron>
          </Styled.PageLink>
        )}
      </Flex>
    </Flex>
  )
}
