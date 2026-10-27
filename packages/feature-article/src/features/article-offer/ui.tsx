import { useState } from 'react'
import { useTheme } from 'styled-components'

import { Button, Chip, Divider, Flex, Text } from '@my-interview/ui-kit'

import type { ArticleOffer as ArticleOfferType } from '@shared/model'

import { Styled } from './styled'
import { PREFIX } from './constants'

/**
 * Карточка оформления подписки на месте закрытого продолжения статьи.
 */
export const ArticleOffer = ({ title, subtitle, benefits, note, plans, button, cancelText }: ArticleOfferType) => {
  const theme = useTheme()
  const [planIndex, setPlanIndex] = useState(0)

  const plan = plans[planIndex] ?? plans[0]

  if (!plan) {
    return null
  }

  return (
    <Styled.Card
      aria-labelledby="article-offer-title"
      as="section"
      flexDirection="column"
      gap={theme.spacings.s24}
      p={theme.spacings.s24}
      tablet={{ alignItems: 'center', flexDirection: 'row' }}
    >
      <Flex flex={1} flexDirection="column" gap={theme.spacings.s16} style={{ minWidth: 0 }}>
        <Flex flexDirection="column" gap={theme.spacings.s2}>
          <Text as="span" color={theme.colors.textPrimary} font="planName" id="article-offer-title">
            {title}
          </Text>
          <Text as="span" color={theme.colors.textSecondary} font="body">
            {subtitle}
          </Text>
        </Flex>

        <Styled.Benefits as="ul" flexDirection="column" gap={theme.spacings.s8}>
          {benefits.map((benefit) => (
            <Flex key={benefit} alignItems="center" as="li" gap={theme.spacings.s10}>
              <Styled.Check>
                <Text as="span" color={theme.colors.accent} font="bodyStrong">
                  {PREFIX}
                </Text>
              </Styled.Check>
              <Text as="span" color={theme.colors.textBody} font="body">
                {benefit}
              </Text>
            </Flex>
          ))}
        </Styled.Benefits>

        <Divider />

        <Text as="p" color={theme.colors.textTertiary} font="planNote">
          {note}
        </Text>
      </Flex>

      <Styled.PricePanel
        $image={plan.image}
        alignItems="center"
        flexDirection="column"
        flexShrink={0}
        gap={theme.spacings.s16}
        p={theme.spacings.s16}
      >
        <Flex aria-label="Период" gap={theme.spacings.s8} role="group">
          {plans.map(({ id, label }, index) => (
            <Chip key={id} selected={index === planIndex} size="sm" onClick={() => setPlanIndex(index)}>
              {label}
            </Chip>
          ))}
        </Flex>

        <Text as="p" color={theme.colors.accent} font="price">
          {plan.price}
        </Text>

        <Button
          fullWidth
          href={button.action.type === 'locally' ? `/checkout?plan=${plan.id}` : button.action.link}
          size="lg"
          variant="primary"
        >
          {button.text}
        </Button>

        <Text as="p" color={theme.colors.textTertiary} font="caption">
          {cancelText}
        </Text>
      </Styled.PricePanel>
    </Styled.Card>
  )
}
