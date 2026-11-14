import { ResourceCard } from '@my-interview/common'
import { Carousel, Title, theme, useBreakpoint } from '@my-interview/ui-kit'

import { INTERVAL_MS, TEXT, WINDOW_SIZE, getDotLabel } from '../constants'
import type { TechnologyResourcesProps } from '../types'
import { Styled } from './styled'

/**
 * Карусель полезных материалов.
 */
export const TechnologyResources = ({ resources }: TechnologyResourcesProps) => {
  const { isMobile } = useBreakpoint()

  if (resources.length === 0) {
    return null
  }

  return (
    <Styled.Resources
      flexDirection="column"
      forwardedAs="section"
      gap={theme.spacings.s16}
      id="resources"
      p={theme.spacings.s20}
    >
      <Title size={700} title={TEXT.RESOURCES_TITLE} titleAs="h2" />
      <Carousel
        getDotLabel={getDotLabel}
        interval={INTERVAL_MS}
        items={resources}
        renderItem={({ href, image, title }) => <ResourceCard href={href} image={image} title={title} />}
        visible={isMobile ? 1 : WINDOW_SIZE}
      />
    </Styled.Resources>
  )
}
