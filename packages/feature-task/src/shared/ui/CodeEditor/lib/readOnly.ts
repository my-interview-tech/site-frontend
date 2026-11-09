import { EditorState, RangeSet, RangeValue, StateField, type Extension } from '@codemirror/state'
import { Decoration, EditorView } from '@codemirror/view'

import type { CodeRange } from '../types'

class Locked extends RangeValue {}

const LOCKED = new Locked()

const lockedMark = Decoration.mark({ class: 'cm-locked' })

/**
 * Запрет правки в диапазонах стартового текста, например в сигнатуре функции.
 * Диапазоны едут вместе с правками вокруг них.
 */
export const readOnlyRangesExtension = (ranges: readonly CodeRange[] | undefined): Extension => {
  if (!ranges || ranges.length === 0) {
    return []
  }

  const locked = StateField.define<RangeSet<Locked>>({
    create: (state) =>
      RangeSet.of(
        ranges
          .map(({ from, to }) => ({ from: Math.max(0, from), to: Math.min(to, state.doc.length) }))
          .filter(({ from, to }) => from < to)
          .map(({ from, to }) => LOCKED.range(from, to)),
        true
      ),
    update: (value, transaction) => value.map(transaction.changes),
  })

  return [
    locked,
    EditorState.changeFilter.of((transaction) => {
      const set = transaction.startState.field(locked)
      let blocked = false

      transaction.changes.iterChangedRanges((from, to) => {
        set.between(from, to, (lockedFrom, lockedTo) => {
          if (to > lockedFrom && from < lockedTo) {
            blocked = true

            return false
          }

          return undefined
        })
      })

      return !blocked
    }),
    EditorView.decorations.compute([locked], (state) => {
      const marks: ReturnType<typeof lockedMark.range>[] = []

      state.field(locked).between(0, state.doc.length, (from, to) => {
        marks.push(lockedMark.range(from, to))
      })

      return Decoration.set(marks, true)
    }),
  ]
}
