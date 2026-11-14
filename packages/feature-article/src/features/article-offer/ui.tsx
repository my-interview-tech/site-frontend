import { useState } from 'react'

import { Card } from '@my-interview/common'
import { Button, Chip, Divider, Flex, Link, Text, Title, theme } from '@my-interview/ui-kit'

import type { ArticleOffer as ArticleOfferType } from '@shared/model'

import { Styled } from './styled'
import { PREFIX } from './constants'

/**
 * Карточка оформления подписки на месте закрытого продолжения статьи.
 */
export const ArticleOffer = ({ title, subtitle, benefits, note, plans, button, cancelText }: ArticleOfferType) => {
  const [planIndex, setPlanIndex] = useState(0)

  const plan = plans[planIndex] ?? plans[0]

  if (!plan) {
    return null
  }

  return (
    <Card
      aria-label={title}
      as="section"
      flexDirection="column"
      gap={theme.spacings.s24}
      p={theme.spacings.s24}
      tablet={{ alignItems: 'center', flexDirection: 'row' }}
    >
      <Flex flex={1} flexDirection="column" gap={theme.spacings.s16} style={{ minWidth: 0 }}>
        <Flex>
          <Title size={700} subtitle={subtitle} title={title} />
        </Flex>

        <Styled.Benefits flexDirection="column" forwardedAs="ul" gap={theme.spacings.s8}>
          {benefits.map((benefit) => (
            <Flex key={benefit} alignItems="center" as="li" gap={theme.spacings.s10}>
              <Styled.Check>
                <Text as="span" color={theme.colors.accent} font={400} weight="semibold">
                  {PREFIX}
                </Text>
              </Styled.Check>
              <Text as="span" color={theme.colors.textBody} font={400}>
                {benefit}
              </Text>
            </Flex>
          ))}
        </Styled.Benefits>

        <Divider />

        <Text as="p" color={theme.colors.textTertiary} font={300}>
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
            <Chip key={id} isSelected={index === planIndex} size={32} onClick={() => setPlanIndex(index)}>
              {label}
            </Chip>
          ))}
        </Flex>

        <Text as="p" color={theme.colors.accent} font={900} weight="bold">
          {plan.price}
        </Text>

        <Button
          fullWidth
          as={Link}
          href={
            button.action.type === 'browser' && button.action.link ? button.action.link : `/checkout?plan=${plan.id}`
          }
          size={48}
          variant="primary"
        >
          {button.text}
        </Button>

        <Text as="p" color={theme.colors.textTertiary} font={200}>
          {cancelText}
        </Text>
      </Styled.PricePanel>
    </Card>
  )
}
