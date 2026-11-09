import { parseHTML } from 'linkedom'

import { BLOCKED_GLOBALS } from '@task/shared/lib'

import './worker.errors'

const host = globalThis as unknown as Record<string, unknown>
const { document, window } = parseHTML('<!doctype html><html><head></head><body></body></html>')
const dom = window as unknown as Record<string, unknown> & {
  HTMLInputElement: { prototype: HTMLInputElement }
}

const DOM_GLOBALS = [
  'CustomEvent',
  'DocumentFragment',
  'Element',
  'Event',
  'FocusEvent',
  'HTMLButtonElement',
  'HTMLElement',
  'HTMLInputElement',
  'HTMLSelectElement',
  'HTMLTextAreaElement',
  'InputEvent',
  'KeyboardEvent',
  'MouseEvent',
  'MutationObserver',
  'Node',
  'Text',
] as const

// linkedom не считает стили: для ролей и имён testing-library хватает пустых значений.
dom.getComputedStyle = () => ({ getPropertyValue: () => '' })

const input = dom.HTMLInputElement.prototype
const CHECKED = Symbol('checked')
const checked = {
  configurable: true,
  get(this: HTMLInputElement & { [CHECKED]?: boolean }) {
    return this[CHECKED] ?? this.hasAttribute('checked')
  },
  set(this: HTMLInputElement & { [CHECKED]?: boolean }, value: boolean) {
    this[CHECKED] = Boolean(value)
  },
}
const dispatch = Reflect.get(input, 'dispatchEvent') as (this: EventTarget, event: Event) => boolean

// React узнаёт текстовое поле по `type`, а у linkedom он пустой без атрибута.
Object.defineProperty(input, 'type', {
  configurable: true,
  get(this: HTMLInputElement) {
    return (this.getAttribute('type') ?? 'text').toLowerCase()
  },
  set(this: HTMLInputElement, value: string) {
    this.setAttribute('type', value)
  },
})

Object.defineProperty(input, 'checked', checked)

// Браузер переключает флажок до обработчиков клика, linkedom — никогда.
input.dispatchEvent = function dispatchWithActivation(this: HTMLInputElement, event: Event) {
  if (event.type === 'click' && (this.type === 'checkbox' || this.type === 'radio')) {
    checked.set.call(this, this.type === 'radio' ? true : !checked.get.call(this))
  }

  return dispatch.call(this, event)
}

// React проверяет поддержку `input` через `'oninput' in document` и иначе ждёт события IE.
Object.assign(document, { onchange: null, oninput: null })

DOM_GLOBALS.forEach((name) => {
  if (host[name] === undefined && dom[name] !== undefined) {
    host[name] = dom[name]
  }
})

host.window = window
host.document = document
host.getComputedStyle = dom.getComputedStyle
host.global = globalThis
host.IS_REACT_ACT_ENVIRONMENT = true

BLOCKED_GLOBALS.forEach((name) => {
  Object.defineProperty(host, name, {
    configurable: false,
    value: () => {
      throw new Error(`${name} недоступен в песочнице`)
    },
    writable: false,
  })
})
