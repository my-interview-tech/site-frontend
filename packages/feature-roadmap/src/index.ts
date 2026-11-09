/**
 * Публичный контракт `@my-interview/feature-roadmap`.
 *
 * Импорт только из `@my-interview/feature-roadmap`.
 * Слайсы пакета снаружи недоступны.
 *
 * Экран читает тему из `UiKitProvider` из `@my-interview/ui-kit`.
 */

/** Граф дорожной карты. Трек берёт из `?track=`. */
export { Roadmap } from './widgets/roadmap'

/** Пропсы `Roadmap`: `topicHref`, `filterEnabled`. */
export type { RoadmapProps } from './widgets/roadmap'
