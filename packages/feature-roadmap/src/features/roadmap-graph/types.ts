import type { Edge, Node } from '@xyflow/react'

import type { Step, Topic } from '@roadmap/shared/config'
import type { FlowContext } from '@roadmap/shared/lib'

export type TopicData = {
  /**
   * Id якоря.
   */
  anchor: string

  /**
   * Тема вне фильтра.
   */
  dimmed: boolean

  /**
   * Адрес темы. Без него карточка не ссылка.
   */
  href?: string

  /**
   * Тема отмечена изученной.
   */
  known: boolean

  /**
   * Тема трека.
   */
  topic: Topic
}

export type LabelData = {
  /**
   * Id якоря развилки.
   */
  anchor: string

  /**
   * Развилка вне фильтра.
   */
  dimmed: boolean

  /**
   * Заголовок развилки.
   */
  title: string
}

export type NoteData = {
  /**
   * Заметка вне фильтра.
   */
  dimmed: boolean

  /**
   * Короткая пометка под текстом.
   */
  promo: string

  /**
   * Текст заметки.
   */
  text: string
}

/** Узел карточки темы. */
export type TopicFlowNode = Node<TopicData, 'topic'>

/** Узел заголовка развилки. */
export type LabelFlowNode = Node<LabelData, 'label'>

/** Узел заметки. */
export type NoteFlowNode = Node<NoteData, 'note'>

/** Ребро со своим SVG-путём. */
export type LineFlowEdge = Edge<{ d: string }, 'line'>

export type GraphProps = FlowContext & {
  /**
   * Шаги открытого трека.
   */
  steps: readonly Step[]

  /**
   * `true` — узлы в DOM и по их якорям можно строить оглавление, `false` — граф снят.
   */
  onReadyChange: (isReady: boolean) => void
}
