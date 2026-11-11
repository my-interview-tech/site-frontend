import { useEffect } from 'react'
import { useSearchParams } from 'react-router'

import { PageContainer, TrackTabs } from '@my-interview/common'
import { Flex, theme, Title } from '@my-interview/ui-kit'

import { RoadmapStage } from '@roadmap/widgets/roadmap'
import { openTracks, trackIdOf, visibleSteps } from '@roadmap/shared/config'
import { TEXT } from '@roadmap/shared/constants'

import { useKnownTopics } from '../hooks'
import type { RoadmapProps } from '../types'
import { Styled } from './styled'

/**
 * Дорожная карта трека.
 *
 * @description
 * Трек берёт из `?track=`. Закрытый или неизвестный трек переписывает адрес на трек по умолчанию.
 */
export const Roadmap = ({ topicHref }: RoadmapProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const known = useKnownTopics()

  const rawTrackId = searchParams.get('track')
  const trackId = trackIdOf(rawTrackId)
  const track = openTracks.find((item) => item.id === trackId)
  const steps = visibleSteps(track?.steps ?? [])

  useEffect(() => {
    if (rawTrackId !== trackId) {
      setSearchParams({ track: trackId }, { preventScrollReset: true, replace: true })
    }
  }, [rawTrackId, setSearchParams, trackId])

  const selectTrack = (id: string) => {
    setSearchParams({ track: id }, { preventScrollReset: true, replace: true })
  }

  if (!track) {
    return null
  }

  return (
    <PageContainer>
      <Flex
        fillWidth
        flexDirection="column"
        gap={theme.spacings.s24}
        p={`${theme.spacings.s96}px 0 ${theme.spacings.s32}px`}
      >
        <Styled.Switcher aria-label={TEXT.TRACKS} forwardedAs="nav" justifyContent="center">
          <TrackTabs activeId={track.id} activeKey={track.id} items={openTracks} onSelect={selectTrack} />
        </Styled.Switcher>

        <Styled.Heading fillWidth justifyContent="center">
          <Title size={900} subtitle={track.lead} title={track.title} titleAs="h1" />
        </Styled.Heading>

        <RoadmapStage known={known} steps={steps} topicHref={topicHref} trackId={track.id} />
      </Flex>
    </PageContainer>
  )
}
