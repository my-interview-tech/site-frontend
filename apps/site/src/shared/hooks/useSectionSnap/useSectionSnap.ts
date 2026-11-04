import { useEffect } from 'react'

import { sectionPinPx } from '@shared/constants'

const approachPx = 12
const commitRatio = 0.62

const easeInOutCubic = (progress: number) => {
  if (progress < 0.5) {
    return 4 * progress * progress * progress
  }

  return 1 - (-2 * progress + 2) ** 3 / 2
}

const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

const useSectionSnap = (enabled = true) => {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) {
      return undefined
    }

    let frame = 0
    let glide = 0
    let locked = false
    let previous = window.scrollY
    let unlockTimer = 0

    const unlock = () => {
      locked = false
      window.clearTimeout(unlockTimer)
    }

    const align = (node: HTMLElement) => {
      if (node.id === 'home-hero') {
        return 0
      }

      return window.scrollY + node.getBoundingClientRect().top - sectionPinPx
    }

    const snapTo = (top: number) => {
      if (Math.abs(top - window.scrollY) < 2) {
        return
      }

      window.cancelAnimationFrame(glide)
      unlock()
      locked = true
      const from = window.scrollY
      const distance = top - from
      const duration = Math.min(920, Math.round(500 + Math.abs(distance) * 0.28))
      const started = performance.now()

      const step = (now: number) => {
        const progress = Math.min(1, (now - started) / duration)

        window.scrollTo(0, from + distance * easeInOutCubic(progress))

        if (progress < 1) {
          glide = window.requestAnimationFrame(step)

          return
        }

        unlock()
      }

      glide = window.requestAnimationFrame(step)
      unlockTimer = window.setTimeout(unlock, duration + 400)
    }

    const onScroll = () => {
      if (locked) {
        previous = window.scrollY

        return
      }

      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const sections = [...document.querySelectorAll<HTMLElement>('[data-snap-section]')]
        const delta = window.scrollY - previous

        previous = window.scrollY

        if (sections.length === 0 || Math.abs(delta) < 2) {
          return
        }

        const view = window.innerHeight
        const commitLine = view * commitRatio
        const entered = sections.filter((node) => {
          const { top } = node.getBoundingClientRect()

          return top < commitLine + approachPx && top > sectionPinPx
        })
        const current = entered[0]

        if (!current) {
          return
        }

        if (delta > 0) {
          snapTo(align(current))

          return
        }

        const index = sections.indexOf(current)
        const previousSection = sections[index - 1]

        snapTo(previousSection ? align(previousSection) : 0)
      })
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.cancelAnimationFrame(glide)
      unlock()
      window.removeEventListener('scroll', onScroll)
      window.cancelAnimationFrame(frame)
    }
  }, [enabled])
}

export { useSectionSnap }
