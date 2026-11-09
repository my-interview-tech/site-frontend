import { Position, type Edge, type EdgeProps, type Node, type NodeProps } from '@xyflow/react'

import { Text, theme } from '@my-interview/ui-kit'

import type { Topic } from '../../lib/graph'
import { TopicCard } from '../TopicCard'

import { Styled } from './styled'

type TopicData = {
  anchor: string
  dimmed: boolean
  href?: string
  known: boolean
  topic: Topic
}

type LabelData = {
  anchor: string
  dimmed: boolean
  title: string
}

type NoteData = {
  dimmed: boolean
  promo: string
  text: string
}

type TopicFlowNode = Node<TopicData, 'topic'>
type LabelFlowNode = Node<LabelData, 'label'>
type NoteFlowNode = Node<NoteData, 'note'>
type LineFlowEdge = Edge<{ d: string }, 'line'>

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

const LabelNode = ({ data }: NodeProps<LabelFlowNode>) => (
  <Styled.Pin fillHeight id={data.anchor} justifyContent="center">
    <Styled.Label $isDimmed={data.dimmed}>{data.title}</Styled.Label>
  </Styled.Pin>
)

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

const BundleNode = () => <Styled.Bundle />

const AnchorNode = () => (
  <>
    <Styled.Anchor id="out" position={Position.Bottom} type="source" />
    <Styled.Anchor id="in" position={Position.Top} type="target" />
  </>
)

const LineEdge = ({ data }: EdgeProps<LineFlowEdge>) => {
  if (!data) {
    return null
  }

  return <Styled.Line interactionWidth={0} path={data.d} />
}

export const nodeTypes = {
  anchor: AnchorNode,
  bundle: BundleNode,
  label: LabelNode,
  note: NoteNode,
  topic: TopicNode,
}

export const edgeTypes = {
  line: LineEdge,
}
