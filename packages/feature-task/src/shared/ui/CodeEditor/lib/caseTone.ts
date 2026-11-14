import { syntaxTree } from '@codemirror/language'
import { EditorState, RangeSet, RangeSetBuilder, StateField } from '@codemirror/state'
import { Decoration, EditorView, gutter, type DecorationSet, type GutterMarker } from '@codemirror/view'

import { CASE_MARKER } from './caseMark'
import { CaseFailureWidget } from './caseMessage'

/** Отметка прогона на строках `describe` / `it`. */
export type CaseToneState = 'failed' | 'passed' | 'running'

export interface CaseTone {
  /** Почему упал `it`. Показывается под его строкой. */
  readonly message?: string
  readonly state: CaseToneState
}

const SUITE = new Set(['describe', 'it', 'test'])

const SPIN_STYLE_ID = 'cm-case-spin'

const ensureSpin = () => {
  if (typeof document === 'undefined' || document.getElementById(SPIN_STYLE_ID)) {
    return
  }

  const style = document.createElement('style')

  style.id = SPIN_STYLE_ID
  style.textContent = '@keyframes cm-case-spin { to { transform: rotate(360deg); } }'
  document.head.appendChild(style)
}

interface Hit {
  readonly lineFrom: number
  readonly lineTo: number
  readonly name: string
  readonly wordFrom: number
  readonly wordTo: number
}

const hitsOf = (state: EditorState): readonly Hit[] => {
  const hits: Hit[] = []

  syntaxTree(state).iterate({
    enter(node) {
      if (node.name !== 'CallExpression') {
        return
      }

      const callee = node.node.firstChild

      if (callee?.name !== 'VariableName') {
        return
      }

      const name = state.sliceDoc(callee.from, callee.to)

      if (!SUITE.has(name)) {
        return
      }

      const line = state.doc.lineAt(callee.from)

      hits.push({ lineFrom: line.from, lineTo: line.to, name, wordFrom: callee.from, wordTo: callee.to })
    },
  })

  if (hits.length > 0) {
    return hits
  }

  const line = state.doc.line(1)

  return [{ lineFrom: line.from, lineTo: line.to, name: 'it', wordFrom: line.from, wordTo: line.from }]
}

interface ToneLayers {
  readonly decorations: DecorationSet
  readonly markers: RangeSet<GutterMarker>
}

const build = (state: EditorState, tone: CaseTone): ToneLayers => {
  const hits = hitsOf(state)
  const anchor = hits.find((hit) => hit.name !== 'describe') ?? hits[0]
  const seen = new Set<number>()
  const decorations = new RangeSetBuilder<Decoration>()
  const markers = new RangeSetBuilder<GutterMarker>()
  const pieces: { readonly from: number; readonly side: number; readonly to: number; readonly value: Decoration }[] = []

  hits.forEach((hit) => {
    if (!seen.has(hit.lineFrom)) {
      seen.add(hit.lineFrom)
      pieces.push({
        from: hit.lineFrom,
        side: -1,
        to: hit.lineFrom,
        value: Decoration.line({ class: `cm-case-line cm-case-line-${tone.state}` }),
      })
      markers.add(hit.lineFrom, hit.lineFrom, CASE_MARKER[tone.state])
    }

    if (hit.wordTo > hit.wordFrom) {
      pieces.push({
        from: hit.wordFrom,
        side: 0,
        to: hit.wordTo,
        value: Decoration.mark({ class: `cm-case-word cm-case-word-${tone.state}` }),
      })
    }
  })

  if (tone.state === 'failed' && tone.message && anchor) {
    pieces.push({
      from: anchor.lineTo,
      side: 1,
      to: anchor.lineTo,
      value: Decoration.widget({ block: true, side: 1, widget: new CaseFailureWidget(tone.message) }),
    })
  }

  pieces
    .sort((left, right) => left.from - right.from || left.side - right.side)
    .forEach((piece) => decorations.add(piece.from, piece.to, piece.value))

  return { decorations: decorations.finish(), markers: markers.finish() }
}

const toneField = (tone: CaseTone) =>
  StateField.define<ToneLayers>({
    create(state) {
      return build(state, tone)
    },
    provide(field) {
      return [
        EditorView.decorations.from(field, (value) => value.decorations),
        gutter({
          class: 'cm-case-gutter',
          markers: (view) => view.state.field(field).markers,
        }),
      ]
    },
    update(value, transaction) {
      return {
        decorations: value.decorations.map(transaction.changes),
        markers: value.markers.map(transaction.changes),
      }
    },
  })

/** Подсветка `describe` / `it` и точка в гаттере. Пустой тон — расширение не нужно. */
export const caseToneExtension = (tone: CaseTone) => {
  ensureSpin()

  return toneField(tone)
}

/** Номера строк с отметкой. Для проверки разбора, без монтирования редактора. */
export const caseToneLines = (state: EditorState, tone: CaseTone): readonly number[] => {
  const lines: number[] = []

  build(state, tone).markers.between(0, state.doc.length, (from) => {
    lines.push(state.doc.lineAt(from).number)
  })

  return lines
}
