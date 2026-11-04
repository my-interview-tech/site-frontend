import { useTheme } from 'styled-components'
import { Badge, Flex, Text } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { FEATURES, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция «как устроена подготовка».
 * @access private
 */
export const HomeFeatures = () => {
  const theme = useTheme()

  return (
    <HomeSection gap={theme.spacings.s56} id="features" surface="canvas">
      <Text as="h2" color={theme.colors.textPrimary} font="sectionTitleMobile" tablet={{ font: 'sectionTitle' }}>
        {TEXT.TITLE}
      </Text>

      <div>
        {FEATURES.map(({ badge, body, image, imageAlt, imageFirst, title }) => (
          <Styled.Row
            key={badge}
            alignItems="stretch"
            flexDirection="column"
            forwardedAs="article"
            gap={theme.spacings.s64}
            tablet={{ alignItems: 'center', flexDirection: 'row' }}
          >
            {imageFirst ? <Styled.Media alt={imageAlt} src={asset(image)} /> : null}

            <Flex flex={1} flexDirection="column" gap={theme.spacings.s24}>
              <Flex alignSelf="flex-start">
                <Badge variant="purple">{badge}</Badge>
              </Flex>
              <Text as="h3" color={theme.colors.textPrimary} font="featureTitle">
                {title}
              </Text>
              <Text as="p" color={theme.colors.textSecondary} font="featureBody">
                {body}
              </Text>
            </Flex>

            {imageFirst ? null : <Styled.Media alt={imageAlt} src={asset(image)} />}
          </Styled.Row>
        ))}
      </div>
    </HomeSection>
  )
}
