import { lazy, Suspense, useState } from 'react'

import { useBreakpoint } from '@my-interview/ui-kit'

import { Outline } from '@roadmap/features/roadmap-outline'
import { StepList } from '@roadmap/features/roadmap-steps'
import { headingsOf } from '@roadmap/shared/lib'

import { GRAPH_BREAKPOINTS, TOC_BREAKPOINTS } from '../constants'
import type { RoadmapStageProps } from '../types'
import { Styled } from './styled'

const Graph = lazy(() => import('@roadmap/features/roadmap-graph').then((module) => ({ default: module.Graph })))
const emptyLens = { layer: null, stack: null } as const

/**
 * Сцена трека: граф или список шагов.
 *
 * @description
 * От `desktopS` — граф, от `desktopM` — оглавление справа, уже — список шагов.
 */
export const RoadmapStage = ({ known, steps, topicHref, trackId }: RoadmapStageProps) => {
  const { breakpoint } = useBreakpoint()
  const [isGraphReady, setIsGraphReady] = useState(false)
  const isGraph = GRAPH_BREAKPOINTS.includes(breakpoint)
  const hasToc = TOC_BREAKPOINTS.includes(breakpoint)

  return (
    <Styled.Stage>
      {isGraph && (
        <Suspense fallback={null}>
          <Graph
            key={trackId}
            known={known}
            lens={emptyLens}
            steps={steps}
            topicHref={topicHref}
            onReadyChange={setIsGraphReady}
          />
        </Suspense>
      )}

      {isGraph && hasToc && (
        <Styled.TocSlot>
          <Styled.TocScroll>
            <Outline items={isGraphReady ? headingsOf(steps, emptyLens) : []} />
          </Styled.TocScroll>
        </Styled.TocSlot>
      )}

      {!isGraph && <StepList known={known} lens={emptyLens} steps={steps} topicHref={topicHref} />}
    </Styled.Stage>
  )
}
