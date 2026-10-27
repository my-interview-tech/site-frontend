import { useTheme } from 'styled-components'

import { useMediaQuery } from '@my-interview/common'
import { Carousel } from '@my-interview/ui-kit'

import { INTERVAL_MS, TEXT, WINDOW_SIZE, dotLabel } from '../constants'
import { mediaQuery } from '../lib'
import type { TechnologyResourcesProps } from '../types'
import { Styled } from './styled'

/**
 * Карусель полезных материалов.
 */
export const TechnologyResources = ({ resources }: TechnologyResourcesProps) => {
  const theme = useTheme()
  const isCompact = useMediaQuery(mediaQuery(theme.breakpoints.tablet))

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
      <Styled.Title>{TEXT.RESOURCES_TITLE}</Styled.Title>
      <Carousel
        dotLabel={dotLabel}
        interval={INTERVAL_MS}
        items={resources}
        nextLabel={TEXT.NEXT}
        previousLabel={TEXT.PREVIOUS}
        renderItem={({ href, image, title: resourceTitle }) => (
          <Styled.Card
            $image={image}
            aria-label={resourceTitle}
            href={href}
            rel="noopener noreferrer"
            target="_blank"
          />
        )}
        visible={isCompact ? 1 : WINDOW_SIZE}
      />
    </Styled.Resources>
  )
}
