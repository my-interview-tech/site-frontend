import type { LayerId, StackId } from '../../config'

/** Фильтр графа: слой и стек. `null` — без фильтра. */
export type Lens = {
  readonly layer: LayerId | null
  readonly stack: StackId | null
}

/** Изученные слаги, линза и адрес темы для сборки графа. */
export type FlowContext = {
  readonly known: ReadonlySet<string>
  readonly lens: Lens
  readonly topicHref: (slug: string) => string
}
