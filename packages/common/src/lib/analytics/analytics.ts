const METRIKA_SRC = 'https://mc.yandex.ru/metrika/tag.js'

type YmInitOptions = {
  clickmap: boolean
  trackLinks: boolean
  accurateTrackBounce: boolean
  webvisor: boolean
}

type Ym = {
  (counterId: number, method: 'init', options: YmInitOptions): void
  (counterId: number, method: 'hit', url: string): void
  (counterId: number, method: 'reachGoal', target: string, params?: object): void
  a?: unknown[]
  l?: number
}

declare global {
  interface Window {
    ym?: Ym
  }
}

let counterId = 0
let lastUrl = ''

const currentUrl = (): string => {
  if (typeof window === 'undefined') {
    return ''
  }

  return `${window.location.pathname}${window.location.search}`
}

const installStub = (): void => {
  if (typeof window.ym === 'function') {
    return
  }

  const queue: unknown[] = []
  const stub = Object.assign(
    (...args: unknown[]) => {
      queue.push(args)
    },
    { a: queue, l: Date.now() }
  ) as Ym

  window.ym = stub
}

const injectScript = (): void => {
  const { scripts } = document

  for (let index = 0; index < scripts.length; index += 1) {
    if (scripts[index]?.src === METRIKA_SRC) {
      return
    }
  }

  const script = document.createElement('script')

  script.async = true
  script.src = METRIKA_SRC

  const first = document.getElementsByTagName('script')[0]

  if (first?.parentNode) {
    first.parentNode.insertBefore(script, first)

    return
  }

  document.head.appendChild(script)
}

/**
 * Подключает счётчик Метрики.
 * @description Пустой id и повторный вызов ничего не делают. Первый просмотр уходит из `init`.
 */
export const ym = (id: number): void => {
  if (!Number.isInteger(id) || id <= 0 || counterId || typeof window === 'undefined') {
    return
  }

  counterId = id
  lastUrl = currentUrl()
  installStub()
  injectScript()
  window.ym?.(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: import.meta.env.PROD,
  })
}

/**
 * Просмотр маршрута SPA. URL, уже отправленный `init`, повторно не уходит.
 */
export const hit = (url: string): void => {
  if (!counterId || !url || url === lastUrl) {
    return
  }

  lastUrl = url
  window.ym?.(counterId, 'hit', url)
}

/** Цель Метрики: идентификатор и объект параметров. */
export const reachGoal = (event: string, params: object): void => {
  if (!counterId || !event) {
    return
  }

  window.ym?.(counterId, 'reachGoal', event, params)
}
