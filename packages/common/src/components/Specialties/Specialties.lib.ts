import { roadmapTrackOf } from './Specialties.constants'

/**
 * Адрес дорожной карты специальности. Без известного трека — общий каталог.
 */
export const roadmapHref = (title: string): string => {
  const track = roadmapTrackOf[title]

  return track ? `/topics?track=${track}` : '/topics'
}
