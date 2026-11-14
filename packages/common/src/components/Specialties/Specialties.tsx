import { useState } from 'react'

import { Text, theme } from '@my-interview/ui-kit'

import { TrackTabs } from '../TrackTabs'
import { RoadmapLink } from './components/RoadmapLink'
import { SpecialtyTabs } from './components/SpecialtyTabs'
import { TechGrid } from './components/TechGrid'
import { specialties, specialtiesCopy } from './Specialties.config'
import { roadmapHref } from './Specialties.lib'
import { Styled } from './Specialties.styled'

/**
 * Каталог специальностей и технологий.
 */
export const Specialties = () => {
  const [activeTitle, setActiveTitle] = useState(specialties[0]?.title ?? '')
  const [trackId, setTrackId] = useState<string | null>(null)
  const active = specialties.find((item) => item.title === activeTitle) ?? specialties[0]
  const track = active?.tracks?.find((item) => item.id === trackId) ?? active?.tracks?.[0]
  const tech = track?.tech ?? active?.tech ?? []
  const roadmap = active ? roadmapHref(active.title) : undefined
  const mobileBottom = theme.spacings.s96 + theme.spacings.s64
  const desktopTop = theme.spacings.s72 + theme.spacings.s64

  if (!active) {
    return null
  }

  return (
    <Styled.Container
      relatively
      data-footer-snap=""
      data-nav-surface="white"
      data-snap-section=""
      desktopS={{
        p: `${desktopTop}px ${theme.container.padding}px ${theme.spacings.s96}px`,
      }}
      flex={1}
      flexDirection="column"
      forwardedAs="section"
      gap={theme.spacings.s32}
      id="specialties"
      p={`${theme.spacings.s96}px ${theme.container.paddingMobile}px ${mobileBottom}px`}
      tablet={{
        p: `${desktopTop}px ${theme.container.paddingTablet}px ${theme.spacings.s96}px`,
      }}
    >
      <Styled.Heading flexDirection="column" gap={theme.spacings.s12}>
        <Text as="h2" color={theme.colors.textPrimary} font={900} weight="semibold">
          {specialtiesCopy.title}
        </Text>

        <Styled.Description color={theme.colors.textSecondary} font={500} forwardedAs="p">
          {specialtiesCopy.description}
        </Styled.Description>
      </Styled.Heading>

      <Styled.Columns flexDirection="row" gap={theme.spacings.s20}>
        <SpecialtyTabs activeTitle={active.title} items={specialties} onSelect={setActiveTitle} />
        <Styled.Catalog flex={1} flexDirection="column" gap={theme.spacings.s12}>
          {Boolean(active.tracks || roadmap) && (
            <Styled.Toolbar alignItems="center" flexWrap="wrap" gap={theme.spacings.s12} justifyContent="space-between">
              {active.tracks && (
                <TrackTabs
                  activeId={track?.id}
                  activeKey={`${active.title}:${track?.id ?? ''}`}
                  items={active.tracks}
                  onSelect={setTrackId}
                />
              )}
              {roadmap && <RoadmapLink href={roadmap} title={active.title} />}
            </Styled.Toolbar>
          )}

          <TechGrid gridKey={`${active.title}:${track?.id ?? ''}`} items={tech} />
        </Styled.Catalog>
      </Styled.Columns>
    </Styled.Container>
  )
}
