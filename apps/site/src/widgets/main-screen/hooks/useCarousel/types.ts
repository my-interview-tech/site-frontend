import type { HeroSlide } from '../../types'

export type Carousel = {
  /**
   * Индекс предыдущего слайда.
   * @description `null`, пока перехода нет.
   * @type {number | null}
   */
  prevIndex: number | null

  /**
   * Текущий слайд.
   * @type {HeroSlide}
   */
  slide: HeroSlide

  /**
   * Индекс текущего слайда.
   * @type {number}
   */
  slideIndex: number

  /**
   * Переключить слайд.
   * @description Тот же индекс игнорируется.
   * @param {number} index - Индекс слайда.
   * @returns {void}
   */
  changeSlide: (index: number) => void
}
