/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { lazy, Suspense, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'

import { Aside, Columns, PageContainer, TrackTabs } from '@my-interview/common'
import { Flex, theme, Title, useBreakpoint } from '@my-interview/ui-kit'

import type { Lens } from '../lib/flow'
import { openTracks, trackIdOf, type LayerId, type StackId } from '../lib/graph'
import { headingsOf } from '../lib/headings'
import { useKnownTopics } from '../hooks'
import { GRAPH_BREAKPOINTS, TEXT, TOC_BREAKPOINTS, TOC_WIDTH } from '../constants'
import type { RoadmapProps } from '../types'

import { Filters } from './Filters'
import { Outline } from './Outline'
import { StepList } from './StepList'
import { Styled } from './styled'

/** xyflow нужен только графу: узкий экран его не грузит. */
const Graph = lazy(() => import('./Graph').then((module) => ({ default: module.Graph })))

const emptyLens: Lens = { layer: null, stack: null }

/**
 * Дорожная карта трека.
 *
 * @description
 * - Трек берёт из `?track=`. Закрытый или неизвестный трек переписывает адрес на трек по умолчанию.
 * - Фильтр слоя и стека включается `filterEnabled` и есть только у трека с `layers` или `stacks`.
 * - От `desktopS` — граф, от `desktopM` — граф с оглавлением, уже — список шагов.
 */
export const Roadmap = ({ filterEnabled = true, topicHref }: RoadmapProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { breakpoint } = useBreakpoint()
  const known = useKnownTopics()
  const [layerId, setLayerId] = useState<LayerId | null>(null)
  const [stackId, setStackId] = useState<StackId | null>(null)
  const [isGraphReady, setIsGraphReady] = useState(false)
  const rawTrackId = searchParams.get('track')
  const trackId = trackIdOf(rawTrackId)
  const track = openTracks.find((item) => item.id === trackId)
  const steps = track?.steps ?? []
  const hasFilter = filterEnabled && Boolean(track?.layers || track?.stacks)
  const layer = track?.layers?.some((item) => item.id === layerId) ? layerId : null
  const stack = track?.stacks?.some((item) => item.id === stackId) ? stackId : null
  const lens = useMemo<Lens>(() => (filterEnabled ? { layer, stack } : emptyLens), [filterEnabled, layer, stack])
  const isGraph = GRAPH_BREAKPOINTS.includes(breakpoint)
  const hasToc = TOC_BREAKPOINTS.includes(breakpoint)

  useEffect(() => {
    if (rawTrackId !== trackId) {
      setSearchParams({ track: trackId }, { preventScrollReset: true, replace: true })
    }
  }, [rawTrackId, setSearchParams, trackId])

  const selectTrack = (id: string) => {
    setSearchParams({ track: id }, { preventScrollReset: true, replace: true })
    setLayerId(null)
    setStackId(null)
  }

  if (!track) {
    return null
  }

  const graph = (
    <Suspense fallback={null}>
      <Graph
        key={track.id}
        known={known}
        lens={lens}
        steps={steps}
        topicHref={topicHref}
        onReadyChange={setIsGraphReady}
      />
    </Suspense>
  )

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

        <Flex alignItems="center" flexDirection="column" gap={theme.spacings.s16}>
          <Styled.Heading fillWidth justifyContent="center">
            <Title size={900} subtitle={track.lead} title={track.title} titleAs="h1" />
          </Styled.Heading>
          {hasFilter && (
            <Filters
              layer={layer}
              layers={track.layers}
              stack={stack}
              stacks={track.stacks}
              onLayerChange={setLayerId}
              onStackChange={setStackId}
            />
          )}
        </Flex>

        {isGraph && hasToc && (
          <Columns align="start" gap={theme.spacings.s20} sidebar={TOC_WIDTH}>
            {graph}
            <Aside>
              <Styled.TocScroll>
                <Outline items={isGraphReady ? headingsOf(steps, lens) : []} />
              </Styled.TocScroll>
            </Aside>
          </Columns>
        )}
        {isGraph && !hasToc && graph}
        {!isGraph && <StepList known={known} lens={lens} steps={steps} topicHref={topicHref} />}
      </Flex>
    </PageContainer>
  )
}
