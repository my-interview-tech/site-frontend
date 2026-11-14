import { roadmapTrackOf } from './Specialties.constants'

/**
 * Адрес дорожной карты специальности. Без открытого трека — `undefined`.
 */
export const roadmapHref = (title: string): string | undefined => {
  const track = roadmapTrackOf[title]

  return track ? `/topics?track=${track}` : undefined
}
