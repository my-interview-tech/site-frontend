import { useTheme } from 'styled-components'
import { Badge, Button, Divider, Flex, GridItem, Text } from '@my-interview/ui-kit'

import { checkoutUrl } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { TEXT, PLANS } from '../config'
import { Styled } from './styled'

/**
 * Секция тарифов.
 * @access private
 */
export const HomePricing = () => {
  const theme = useTheme()
  const { BADGE, TITLE, LEAD, TRUST } = TEXT

  return (
    <HomeSection fillViewport gap={theme.spacings.s40} id="pricing" surface="white">
      <Styled.Header alignItems="center" flexDirection="column" forwardedAs="header" gap={theme.spacings.s12}>
        <Badge variant="purple">{BADGE}</Badge>

        <Text as="h2" color={theme.colors.ink} font="pricingTitle">
          {TITLE}
        </Text>

        <Text as="p" color={theme.colors.muted} font="bodyLg">
          {LEAD}
        </Text>
      </Styled.Header>

      <Styled.Cards>
        {PLANS.map(({ name, highlighted, badgeTone, badge, note, price, oldPrice, period, features, cta }) => (
          <GridItem key={name} size={4}>
            <Styled.PlanCard
              $highlighted={highlighted}
              flexDirection="column"
              forwardedAs="article"
              gap={theme.spacings.s24}
            >
              <Flex flexDirection="column" gap={theme.spacings.s8}>
                <Badge variant={badgeTone}>{badge}</Badge>

                <div>
                  <Text as="h3" color={theme.colors.ink} font="planName">
                    {name}
                  </Text>

                  <Text as="p" color={theme.colors.muted} font="planNote">
                    {note}
                  </Text>
                </div>
              </Flex>

              <div>
                <Flex alignItems="baseline" gap={theme.spacings.s8}>
                  <Text as="p" color={theme.colors.ink} font="price">
                    {price}
                  </Text>

                  {oldPrice && (
                    <Styled.OldPrice color={theme.colors.strike} font="lead">
                      {oldPrice}
                    </Styled.OldPrice>
                  )}
                </Flex>

                <Text as="p" color={theme.colors.muted} font="caption">
                  {period}
                </Text>
              </div>

              <Divider />
              <Flex as="ul" flex={1} flexDirection="column" gap={theme.spacings.s12}>
                {features.map(({ included, label }) => (
                  <Styled.Feature key={label} $included={included} forwardedAs="li" gap={theme.spacings.s8}>
                    <span>{included ? '✓' : '—'}</span>
                    {label}
                  </Styled.Feature>
                ))}
              </Flex>

              <Button fullWidth href={checkoutUrl} size="lg" variant={highlighted ? 'primary' : 'default'}>
                {cta}
              </Button>
            </Styled.PlanCard>
          </GridItem>
        ))}
      </Styled.Cards>

      <Text as="p" color={theme.colors.caption} font="planNote" textAlign="center">
        {TRUST}
      </Text>
    </HomeSection>
  )
}
