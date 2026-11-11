import type { TocItem } from '@my-interview/common'

import type { Step } from '../../config'
import { anchorOf } from '../anchor'
import { covers, stepLit, type Lens } from '../flow'

/**
 * Пункты оглавления трека: тема шага, развилка, темы группы. Шаг вне фильтра приглушён.
 */
export const headingsOf = (steps: readonly Step[], lens: Lens): TocItem[] =>
  steps.flatMap((step): TocItem[] => {
    if (step.kind === 'node') {
      return [{ id: anchorOf(step.topic.slug), isDimmed: !covers(step.topic, lens), label: step.topic.title }]
    }

    if (step.kind === 'fork') {
      return [{ id: anchorOf(step.slug), isDimmed: !stepLit(step, lens), label: step.title }]
    }

    if (step.kind === 'group') {
      return step.topics.map((topic) => ({
        id: anchorOf(topic.slug),
        isDimmed: !covers(topic, lens),
        label: topic.title,
      }))
    }

    return []
  })
