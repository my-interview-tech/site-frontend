import { useEffect, type RefObject } from 'react'

import lottie from 'lottie-web/build/player/lottie_light'

/**
 * Хук для управления Lottie-фоновом.
 * @param {RefObject<HTMLDivElement | null>} ref - Ссылка на DOM-элемент.
 * @returns {void}
 */
export const useLottieAnimation = (ref: RefObject<HTMLDivElement | null>): void => {
  useEffect(() => {
    const node = ref.current

    if (!node) return

    const animation = lottie.loadAnimation({
      autoplay: !window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      container: node,
      loop: true,
      path: '/guest/hero-mesh.json',
      renderer: 'svg',
      rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice',
      },
    })

    const fit = () => {
      const svg = node.querySelector('svg')

      if (!svg) return

      svg.setAttribute('viewBox', '-24 10 1488 642')
    }

    animation.addEventListener('DOMLoaded', fit)

    return () => animation.destroy()
  }, [ref])
}
