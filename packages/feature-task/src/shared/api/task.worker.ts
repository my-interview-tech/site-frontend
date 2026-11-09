// Окружение — до React: react-dom читает `document` и `reportError` при загрузке.
import './worker.prelude'

import React, { act, isValidElement, type ElementType, type ReactNode } from 'react'
import { createRoot, type Root } from 'react-dom/client'

import { fireEvent as domFireEvent, screen, within } from '@testing-library/dom'

import { execute, type Runtime } from './evaluate'
import { takeReported } from './worker.errors'
import type { HostMessage, WorkerMessage } from './worker.protocol'

type Fire = (...args: unknown[]) => boolean

const roots = new Set<Root>()

/**
 * `act` без промиса. Ошибку обработчика или рендера, сообщённую React, бросает в тест.
 */
const actSync = <T>(callback: () => T): T => {
  let result: T | undefined

  takeReported()
  act(() => {
    result = callback()
  })

  const [error] = takeReported()

  if (error !== undefined) {
    throw error instanceof Error ? error : new Error(String(error))
  }

  return result as T
}

const toElement = (ui: unknown): ReactNode => (isValidElement(ui) ? ui : React.createElement(ui as ElementType))

/**
 * Рендер в документ воркера. Принимает элемент `<Counter />` или сам компонент.
 */
const render = (ui: unknown) => {
  const container = document.createElement('div')
  const root = createRoot(container)

  document.body.appendChild(container)
  roots.add(root)
  actSync(() => root.render(toElement(ui)))

  return {
    ...within(container),
    container,
    rerender: (next: unknown) => actSync(() => root.render(toElement(next))),
    unmount: () => {
      roots.delete(root)
      actSync(() => root.unmount())
    },
  }
}

/**
 * `fireEvent` из testing-library внутри `act`: состояние обновлено к следующей строке теста.
 */
const fireEvent = Object.assign(
  (element: Element, event: Event) => actSync(() => domFireEvent(element, event)),
  Object.fromEntries(
    Object.entries(domFireEvent).map(([name, fire]) => [
      name,
      (...args: unknown[]) => actSync(() => (fire as Fire)(...args)),
    ])
  )
)

const reset = () => {
  roots.forEach((root) => actSync(() => root.unmount()))
  roots.clear()
  document.body.innerHTML = ''
}

const runtime: Runtime = {
  globals: { React, act, fireEvent, render, screen, within },
  modules: { react: React },
  reset,
}

interface WorkerScope {
  onmessage: ((event: MessageEvent<HostMessage>) => void) | null
  postMessage: (message: WorkerMessage) => void
}

const scope = globalThis as unknown as WorkerScope

scope.onmessage = (event) => {
  void execute(event.data.input, runtime).then((report) => {
    scope.postMessage({ report, type: 'report' })
  })
}

scope.postMessage({ type: 'ready' })
