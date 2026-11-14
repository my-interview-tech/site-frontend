import { Position, type EdgeProps, type NodeProps } from '@xyflow/react'

import { Text, theme } from '@my-interview/ui-kit'

import { TopicCard } from '@roadmap/entities/topic'

import { Styled } from './styled'
import type { LabelFlowNode, LineFlowEdge, NoteFlowNode, TopicFlowNode } from './types'

/**
 * Узел темы.
 * @description С якорем карточка стоит в точке прокрутки, без якоря — просто карточка.
 */
const TopicNode = ({ data }: NodeProps<TopicFlowNode>) => {
  const card = <TopicCard href={data.href} isDimmed={data.dimmed} isKnown={data.known} topic={data.topic} />

  if (!data.anchor) {
    return card
  }

  return (
    <Styled.Pin fillHeight id={data.anchor} justifyContent="center">
      {card}
    </Styled.Pin>
  )
}

/**
 * Узел заголовка развилки.
 * @description Заголовок развилки стоит в точке прокрутки.
 */
const LabelNode = ({ data }: NodeProps<LabelFlowNode>) => (
  <Styled.Pin fillHeight id={data.anchor} justifyContent="center">
    <Styled.Label $isDimmed={data.dimmed} color={theme.colors.ink} font={500} textAlign="center" weight="semibold">
      {data.title}
    </Styled.Label>
  </Styled.Pin>
)

/**
 * Узел заметки.
 * @description Под текстом показывает пометку, если она есть.
 */
const NoteNode = ({ data }: NodeProps<NoteFlowNode>) => (
  <Styled.Note
    $isDimmed={data.dimmed}
    flexDirection="column"
    gap={theme.spacings.s6}
    p={`${theme.spacings.s12}px ${theme.spacings.s16}px`}
  >
    <Text as="p" color={theme.colors.textSecondary} font={400}>
      {data.text}
    </Text>
    {Boolean(data.promo) && (
      <Text as="p" color={theme.colors.accent} font={200}>
        {data.promo}
      </Text>
    )}
  </Styled.Note>
)

/**
 * Пунктирная рамка группы тем.
 * @description Пунктирная рамка группы тем.
 */
const BundleNode = () => <Styled.Bundle />

/**
 * Невидимые ручки ствола: низ отдаёт ребро, верх принимает.
 * @description Невидимые ручки ствола: низ отдаёт ребро, верх принимает.
 */
const AnchorNode = () => (
  <>
    <Styled.Anchor id="out" position={Position.Bottom} type="source" />
    <Styled.Anchor id="in" position={Position.Top} type="target" />
  </>
)

/**
 * Ребро по готовому SVG-пути.
 * @description Без пути ничего не рисует.
 */
const LineEdge = ({ data }: EdgeProps<LineFlowEdge>) => {
  if (!data) {
    return null
  }

  return <Styled.Line interactionWidth={0} path={data.d} />
}

/**
 * Карта узлов xyflow: тема, развилка, заметка, группа и ручки ствола.
 * @description Карта узлов xyflow: тема, развилка, заметка, группа и ручки ствола.
 */
export const nodeTypes = {
  anchor: AnchorNode,
  bundle: BundleNode,
  label: LabelNode,
  note: NoteNode,
  topic: TopicNode,
}

/**
 * Карта рёбер xyflow: линия по SVG-пути.
 * @description Карта рёбер xyflow: линия по SVG-пути.
 */
export const edgeTypes = {
  line: LineEdge,
}
