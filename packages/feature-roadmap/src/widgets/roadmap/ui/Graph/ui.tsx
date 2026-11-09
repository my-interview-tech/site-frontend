import { useEffect, useMemo } from 'react'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useThemeMode } from '@my-interview/ui-kit'

import { buildFlow, type FlowContext } from '../../lib/flow'
import type { Step } from '../../lib/graph'
import { edgeTypes, nodeTypes } from '../Nodes'

import { Styled } from './styled'

// eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
export type GraphProps = FlowContext & {
  steps: readonly Step[]
  /** `true` — узлы в DOM и по их якорям можно строить оглавление, `false` — граф снят. */
  onReadyChange: (isReady: boolean) => void
}

/**
 * Граф трека на xyflow. Статичный: без панорамы, зума и перетаскивания.
 *
 * @description
 * xyflow кладёт узлы в DOM после своего эффекта, поэтому готовность приходит из `onInit`, а не из монтирования.
 * Хост пересоздаёт граф через `key` при смене трека.
 */
export const Graph = ({ known, lens, onReadyChange, steps, topicHref }: GraphProps) => {
  const { mode } = useThemeMode()
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const graph = useMemo(() => buildFlow(steps, { known, lens, topicHref }), [known, lens, steps, topicHref])

  useEffect(() => () => onReadyChange(false), [onReadyChange])

  return (
    <Styled.Flow $height={graph.height}>
      <ReactFlow
        className="nowheel nopan"
        colorMode={mode}
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        edges={graph.edges}
        edgeTypes={edgeTypes}
        elementsSelectable={false}
        maxZoom={1}
        minZoom={1}
        nodes={graph.nodes}
        nodesConnectable={false}
        nodesDraggable={false}
        nodeTypes={nodeTypes}
        panOnDrag={false}
        panOnScroll={false}
        preventScrolling={false}
        proOptions={{ hideAttribution: false }}
        selectionOnDrag={false}
        zoomOnDoubleClick={false}
        zoomOnPinch={false}
        zoomOnScroll={false}
        onInit={() => onReadyChange(true)}
      />
    </Styled.Flow>
  )
}
