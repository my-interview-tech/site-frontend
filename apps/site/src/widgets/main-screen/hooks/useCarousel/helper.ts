import { SLIDES } from '../../config'
import type { HeroSlide } from '../../types'

/**
 * Получить слайд по индексу.
 * @param {number} index - Индекс слайда.
 * @returns {HeroSlide} - Слайд.
 */
export const getSlide = (index: number): HeroSlide => {
  const slide = SLIDES[index] ?? SLIDES[0]

  if (!slide) {
    throw new Error('Slides are empty')
  }

  return slide
}
