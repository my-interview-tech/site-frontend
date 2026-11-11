import type { Step } from '@roadmap/shared/config'

export type RoadmapStageProps = {
  /**
   * Изученные слаги из профиля.
   */
  known: ReadonlySet<string>

  /**
   * Шаги открытого трека.
   */
  steps: readonly Step[]

  /**
   * Адрес темы по слагу.
   */
  topicHref: (slug: string) => string

  /**
   * Id трека.
   */
  trackId: string
}
