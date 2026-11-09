import { useEffect, useState } from 'react'

export type MountTransition = {
  /**
   * Элемент в DOM: с начала открытия до конца анимации закрытия.
   */
  isMounted: boolean

  /**
   * Видимое состояние для CSS-перехода. Включается кадром позже монтирования.
   */
  isVisible: boolean
}

/**
 * Монтирование с анимацией входа и выхода.
 * Открытие: монтирует скрытым, через два кадра делает видимым. Закрытие: скрывает и размонтирует через `duration`.
 */
export const useMountTransition = (isOpen: boolean, duration: number): MountTransition => {
  const [isMounted, setIsMounted] = useState(isOpen)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true)

      let inner = 0
      const outer = window.requestAnimationFrame(() => {
        inner = window.requestAnimationFrame(() => setIsVisible(true))
      })

      return () => {
        window.cancelAnimationFrame(outer)
        window.cancelAnimationFrame(inner)
      }
    }

    setIsVisible(false)
    const timer = window.setTimeout(() => setIsMounted(false), duration)

    return () => {
      window.clearTimeout(timer)
    }
  }, [duration, isOpen])

  return { isMounted, isVisible }
}
