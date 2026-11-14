import { Badge, Flex, Image, Title, theme } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { HomeSection } from '@shared/ui/home-section'

import { FEATURES, TEXT } from '../config'
import { Styled } from './styled'

/**
 * Секция «как устроена подготовка».
 * @access private
 */
export const HomeFeatures = () => (
  <HomeSection gap={theme.spacings.s56} id="features" surface="canvas">
    <Title size={900} title={TEXT.TITLE} titleAs="h2" />

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
          {imageFirst && (
            <Image
              alt={imageAlt}
              desktopS={{ height: 320, maxHeight: 'none', width: 480 }}
              fit="cover"
              height="auto"
              radius={theme.radii.r10}
              src={asset(image)}
              tablet={{ height: 'auto', maxHeight: 280, width: 'min(480px, 42%)' }}
              width="100%"
            />
          )}

          <Flex flex={1} flexDirection="column" gap={theme.spacings.s24}>
            <Flex alignSelf="flex-start">
              <Badge color="purpleOutline">{badge}</Badge>
            </Flex>
            <Flex>
              <Title size={900} subtitle={body} title={title} titleAs="h3" />
            </Flex>
          </Flex>

          {!imageFirst && (
            <Image
              alt={imageAlt}
              desktopS={{ height: 320, maxHeight: 'none', width: 480 }}
              fit="cover"
              height="auto"
              radius={theme.radii.r10}
              src={asset(image)}
              tablet={{ height: 'auto', maxHeight: 280, width: 'min(480px, 42%)' }}
              width="100%"
            />
          )}
        </Styled.Row>
      ))}
    </div>
  </HomeSection>
)
