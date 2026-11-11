import { type Edge, type Node } from '@xyflow/react'

import { type Step, type Topic } from '../../config'
import { anchorOf } from '../anchor'
import { branchPath, forkPath, GAP, spinePaths, TRUNK, type Joint } from '../links'
import type { FlowContext, Lens } from './types'

/** Ширина полотна графа, px. */
const WIDTH = 980

/** Ширина карточки темы, px. */
const CARD_W = 240

/** Высота карточки темы, px. */
const CARD_H = 74

const LABEL_H = 32
const NOTE_W = 360
const CENTER_X = (WIDTH - CARD_W) / 2
const LEFT_X = CENTER_X - TRUNK - CARD_W
const RIGHT_X = CENTER_X + CARD_W + TRUNK
const SPINE_X = WIDTH / 2
const ROW_PAD = 28
const COMPACT_PAD = 12
const BRANCH_PAD = 16
const CARD_GAP = 10
const NOTE_MARGIN = 16
const BUNDLE_PAD = 20
const BUNDLE_MARGIN = 24
const BUNDLE_W = 320

/** Тема проходит линзу слоя и стека. */
const covers = (topic: Topic, lens: Lens) => {
  const layerOk = !lens.layer || (topic.layers?.includes(lens.layer) ?? false)
  const stackOk = !lens.stack || !topic.stacks?.length || topic.stacks.includes(lens.stack)

  return layerOk && stackOk
}

const sideTopics = (side?: { readonly items: readonly Topic[] }) => side?.items ?? []

/** Темы шага: у группы свои, у узла центр и бока, у развилки только бока. */
const stepTopics = (step: Step) => {
  if (step.kind === 'group') {
    return step.topics
  }

  if (step.kind === 'node') {
    return [step.topic, ...sideTopics(step.left), ...sideTopics(step.right)]
  }

  if (step.kind === 'fork') {
    return [...sideTopics(step.left), ...sideTopics(step.right)]
  }

  return []
}

/** Шаг виден, если линзу проходит хотя бы одна его тема. */
const stepLit = (step: Step, lens: Lens) => stepTopics(step).some((item) => covers(item, lens))

/** Заметка горит, если горит ближайший шаг до или после неё. */
const noteLit = (steps: readonly Step[], index: number, lens: Lens) => {
  const previous = steps
    .slice(0, index)
    .reverse()
    .find((item) => item.kind !== 'note')
  const next = steps.slice(index + 1).find((item) => item.kind !== 'note')

  return Boolean((previous && stepLit(previous, lens)) || (next && stepLit(next, lens)))
}

const branchHeight = (count: number) => (count === 0 ? 0 : BRANCH_PAD * 2 + count * CARD_H + (count - 1) * CARD_GAP)

const noteHeight = (text: string, promo?: string) => {
  const lines = Math.max(1, Math.ceil(text.length / 34))
  const promoBlock = promo ? 26 : 0

  return 24 + lines * 22 + promoBlock
}

const card = (item: Topic, x: number, y: number, index: number, context: FlowContext, anchor = ''): Node =>
  ({
    id: `card-${index}`,
    type: 'topic',
    position: { x, y },
    data: {
      anchor,
      dimmed: !covers(item, context.lens),
      href: item.disabled ? undefined : context.topicHref(item.slug),
      known: context.known.has(item.slug),
      topic: item,
    },
    width: CARD_W,
    height: CARD_H,
    draggable: false,
    selectable: false,
    connectable: false,
    focusable: false,
    zIndex: 2,
    style: { height: CARD_H, width: CARD_W },
  }) as Node

/** Узлы и SVG-рёбра трека для xyflow. */
const buildFlow = (steps: readonly Step[], context: FlowContext) => {
  const { lens } = context
  const nodes: Node[] = []
  const lines: string[] = []
  const cuts: { bottom: number; top: number }[] = []
  let cursor = 0

  const pushBranch = (items: readonly Topic[], side: 'left' | 'right', top: number, inner: number, cutY: number) => {
    if (items.length === 0) {
      return
    }

    const block = branchHeight(items.length)
    const origin = top + (inner - block) / 2
    const joints: Joint[] = []

    items.forEach((item, index) => {
      const cardY = origin + BRANCH_PAD + index * (CARD_H + CARD_GAP)
      const x = side === 'left' ? LEFT_X : RIGHT_X

      nodes.push(card(item, x, cardY, nodes.length, context))
      joints.push({
        edge: side === 'right' ? x : x + CARD_W,
        y: cardY + CARD_H / 2,
      })
    })

    const first = joints[0]

    if (!first) {
      return
    }

    const trunkX = side === 'right' ? first.edge - TRUNK : first.edge + TRUNK
    const branch = branchPath(joints, trunkX)
    const fork = forkPath(SPINE_X, trunkX, cutY)

    if (branch) {
      lines.push(branch)
    }

    if (fork) {
      lines.push(fork)
    }
  }

  steps.forEach((step, stepIndex) => {
    if (step.kind === 'note') {
      const height = noteHeight(step.text, step.promo)
      const y = cursor + NOTE_MARGIN
      const linked = noteLit(steps, stepIndex, lens)

      nodes.push({
        id: `note-${stepIndex}`,
        type: 'note',
        position: { x: (WIDTH - NOTE_W) / 2, y },
        data: { dimmed: !linked, promo: step.promo ?? '', text: step.text },
        width: NOTE_W,
        height,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 2,
        style: { height, width: NOTE_W },
      })
      cuts.push({ bottom: y + height, top: y })
      cursor = y + height + NOTE_MARGIN

      return
    }

    if (step.kind === 'group') {
      const inner = step.topics.length * (COMPACT_PAD * 2 + CARD_H)
      const height = BUNDLE_PAD * 2 + inner
      const y = cursor + BUNDLE_MARGIN

      nodes.push({
        id: `bundle-${stepIndex}`,
        type: 'bundle',
        position: { x: (WIDTH - BUNDLE_W) / 2, y },
        data: {},
        width: BUNDLE_W,
        height,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 0,
        style: { height, pointerEvents: 'none', width: BUNDLE_W },
      })
      step.topics.forEach((item, index) => {
        const cardY = y + BUNDLE_PAD + COMPACT_PAD + index * (COMPACT_PAD * 2 + CARD_H)

        nodes.push(card(item, CENTER_X, cardY, nodes.length, context, anchorOf(item.slug)))
        cuts.push({ bottom: cardY + CARD_H, top: cardY })
      })
      cursor = y + height + BUNDLE_MARGIN

      return
    }

    const left = sideTopics(step.left)
    const right = sideTopics(step.right)
    const centerH = step.kind === 'fork' ? LABEL_H : CARD_H
    const inner = Math.max(branchHeight(left.length), branchHeight(right.length), centerH)
    const top = cursor + ROW_PAD
    const centerY = top + (inner - centerH) / 2
    const cutY = centerY + centerH / 2

    if (step.kind === 'fork') {
      nodes.push({
        id: `label-${step.slug}`,
        type: 'label',
        position: { x: CENTER_X, y: centerY },
        data: { anchor: anchorOf(step.slug), dimmed: !stepLit(step, lens), title: step.title },
        width: CARD_W,
        height: LABEL_H,
        draggable: false,
        selectable: false,
        connectable: false,
        focusable: false,
        zIndex: 2,
        style: { height: LABEL_H, width: CARD_W },
      })
    } else {
      nodes.push(card(step.topic, CENTER_X, centerY, nodes.length, context, anchorOf(step.topic.slug)))
    }

    cuts.push({ bottom: centerY + centerH, top: centerY })
    pushBranch(left, 'left', top, inner, cutY)
    pushBranch(right, 'right', top, inner, cutY)
    cursor = top + inner + ROW_PAD
  })

  const height = Math.max(cursor, 1)

  nodes.push(
    {
      id: 'spine-start',
      type: 'anchor',
      position: { x: SPINE_X, y: 0 },
      data: {},
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      style: { height: 1, opacity: 0, pointerEvents: 'none', width: 1 },
    },
    {
      id: 'spine-end',
      type: 'anchor',
      position: { x: SPINE_X, y: height },
      data: {},
      draggable: false,
      selectable: false,
      connectable: false,
      focusable: false,
      style: { height: 1, opacity: 0, pointerEvents: 'none', width: 1 },
    }
  )

  const edges: Edge[] = [...spinePaths(height, SPINE_X, cuts, GAP), ...lines].map((d, index) => ({
    id: `line-${index}`,
    source: 'spine-start',
    target: 'spine-end',
    type: 'line',
    sourceHandle: 'out',
    targetHandle: 'in',
    data: { d },
    deletable: false,
    focusable: false,
    selectable: false,
  }))

  return { edges, height, nodes }
}

export {
  buildFlow,
  CARD_H as CARD_HEIGHT,
  CARD_W as CARD_WIDTH,
  covers,
  noteLit,
  stepLit,
  stepTopics,
  WIDTH as FLOW_WIDTH,
}
