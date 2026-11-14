import { useEffect, useMemo } from 'react'
import { ReactFlow } from '@xyflow/react'
import '@xyflow/react/dist/style.css'

import { useThemeMode } from '@my-interview/ui-kit'

import { buildFlow } from '@roadmap/shared/lib'

import { edgeTypes, nodeTypes } from './config'
import { Styled } from './styled'
import type { GraphProps } from './types'

/**
 * Граф трека на xyflow. Статичный: без панорамы, зума и перетаскивания.
 *
 * @description
 * xyflow кладёт узлы в DOM после своего эффекта, поэтому готовность приходит из `onInit`, а не из монтирования.
 * Хост пересоздаёт граф через `key` при смене трека.
 * Без `onNodeClick` xyflow ставит узлу `pointer-events: none`, и ссылка темы не нажимается.
 */
const keepNodesClickable = () => undefined

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
        onNodeClick={keepNodesClickable}
      />
    </Styled.Flow>
  )
}
