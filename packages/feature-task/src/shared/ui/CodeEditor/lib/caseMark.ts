import { GutterMarker } from '@codemirror/view'

type MarkState = 'failed' | 'passed' | 'running'

const LABEL = { failed: 'Не пройден', passed: 'Пройден', running: 'Выполняется' } as const

class CaseGutterMarker extends GutterMarker {
  readonly state: MarkState

  constructor(state: MarkState) {
    super()
    this.state = state
  }

  eq(other: GutterMarker) {
    return other instanceof CaseGutterMarker && other.state === this.state
  }

  toDOM() {
    const mark = document.createElement('span')

    mark.className = `cm-case-mark cm-case-mark-${this.state}`
    mark.setAttribute('role', 'img')
    mark.setAttribute('aria-label', LABEL[this.state])

    return mark
  }
}

export const CASE_MARKER = {
  failed: new CaseGutterMarker('failed'),
  passed: new CaseGutterMarker('passed'),
  running: new CaseGutterMarker('running'),
}
