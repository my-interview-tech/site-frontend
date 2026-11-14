import { useCallback, useEffect, useRef, useState } from 'react'

import { slideDurationMs, slideMotionMs } from '../../constants'
import { SLIDES } from '../../config'
import type { Carousel } from './types'
import { getSlide } from './helper'

/**
 * Хук для управления слайдом карусели.
 * @description Индекс слайда, уходящий кадр и автопрокрутка.
 * @returns {Carousel}
 */
export const useCarousel = (): Carousel => {
  const slideIndexRef = useRef(0)
  const [slideIndex, setSlideIndex] = useState(0)
  const [prevIndex, setPrevIndex] = useState<number | null>(null)

  const changeSlide = useCallback((index: number) => {
    const { current } = slideIndexRef

    if (current === index) return

    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPrevIndex(current)
    }

    slideIndexRef.current = index
    setSlideIndex(index)
  }, [])

  /** Автопрокрутка слайдов. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined
    }

    const timer = window.setTimeout(() => {
      changeSlide((slideIndex + 1) % SLIDES.length)
    }, slideDurationMs)

    return () => window.clearTimeout(timer)
  }, [changeSlide, slideIndex])

  /** Убираем уходящий кадр. */
  useEffect(() => {
    if (prevIndex === null) {
      return undefined
    }

    const timer = window.setTimeout(() => setPrevIndex(null), slideMotionMs)

    return () => window.clearTimeout(timer)
  }, [prevIndex])

  return {
    prevIndex,
    slide: getSlide(slideIndex),
    slideIndex,
    changeSlide,
  }
}
