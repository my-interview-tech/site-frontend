import { Badge, Button, Divider, Flex, GridItem, Icon, Link, Text, Title, theme } from '@my-interview/ui-kit'

import { HomeSection } from '@shared/ui/home-section'

import { TEXT, PLANS } from '../config'
import { Styled } from './styled'

/**
 * Секция тарифов.
 * @access private
 */
export const HomePricing = () => {
  const { BADGE, TITLE, LEAD, TRUST } = TEXT

  return (
    <HomeSection fillViewport gap={theme.spacings.s40} id="pricing" surface="white">
      <Styled.Header alignItems="center" flexDirection="column" forwardedAs="header" gap={theme.spacings.s12}>
        <Badge color="purpleOutline">{BADGE}</Badge>
        <Title size={900} subtitle={LEAD} title={TITLE} titleAs="h2" />
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
                <Badge color={badgeTone}>{badge}</Badge>
                <Title size={700} subtitle={note} title={name} titleAs="h3" />
              </Flex>

              <div>
                <Flex alignItems="baseline" gap={theme.spacings.s8}>
                  <Text as="p" color={theme.colors.ink} font={900} weight="bold">
                    {price}
                  </Text>

                  {oldPrice && (
                    <Styled.OldPrice color={theme.colors.strike} font={600}>
                      {oldPrice}
                    </Styled.OldPrice>
                  )}
                </Flex>

                <Text as="p" color={theme.colors.muted} font={200}>
                  {period}
                </Text>
              </div>

              <Divider />
              <Flex as="ul" flex={1} flexDirection="column" gap={theme.spacings.s12}>
                {features.map(({ included, label }) => (
                  <Styled.Feature key={label} $included={included} forwardedAs="li" gap={theme.spacings.s8}>
                    {included ? <Icon isMonochrome iconSrc="icon-check" size={16} /> : <span>—</span>}
                    {label}
                  </Styled.Feature>
                ))}
              </Flex>

              <Button fullWidth as={Link} href="/" size={48} variant={highlighted ? 'primary' : 'secondary'}>
                {cta}
              </Button>
            </Styled.PlanCard>
          </GridItem>
        ))}
      </Styled.Cards>

      <Text as="p" color={theme.colors.caption} font={300} textAlign="center">
        {TRUST}
      </Text>
    </HomeSection>
  )
}
