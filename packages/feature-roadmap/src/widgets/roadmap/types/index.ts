export type RoadmapProps = {
  /** Показывать фильтр слоя и стека. @default true */
  filterEnabled?: boolean
  /** Адрес темы для узла по слагу. */
  topicHref: (slug: string) => string
}
