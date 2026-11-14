import { WidgetType } from '@codemirror/view'

/** Причина падения под строкой `it`. */
export class CaseFailureWidget extends WidgetType {
  readonly text: string

  constructor(text: string) {
    super()
    this.text = text
  }

  eq(other: WidgetType) {
    return other instanceof CaseFailureWidget && other.text === this.text
  }

  toDOM() {
    const message = document.createElement('pre')

    message.className = 'cm-case-message'
    message.textContent = this.text

    return message
  }

  ignoreEvent() {
    return this.text.length > 0
  }
}
