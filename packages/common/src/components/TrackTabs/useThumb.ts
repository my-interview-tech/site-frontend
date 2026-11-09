import { useLayoutEffect, useRef, useState, type RefObject } from 'react'

import { emptyThumb } from './TrackTabs.constants'
import { thumbOf } from './TrackTabs.lib'
import type { ThumbBox } from './TrackTabs.types'

/**
 * Бегунок выбранной вкладки. Пересчитывается при смене вкладки и при ресайзе острова.
 */
export const useThumb = (activeKey: string): { ref: RefObject<HTMLDivElement | null>; thumb: ThumbBox } => {
  const ref = useRef<HTMLDivElement>(null)
  const [thumb, setThumb] = useState<ThumbBox>(emptyThumb)

  useLayoutEffect(() => {
    const root = ref.current

    if (!root) {
      return undefined
    }

    const place = () => {
      const next = thumbOf(root)

      setThumb((current) =>
        current.x === next.x && current.y === next.y && current.width === next.width && current.height === next.height
          ? current
          : next
      )
    }

    place()
    const observer = new ResizeObserver(place)

    observer.observe(root)

    return () => observer.disconnect()
  }, [activeKey])

  return { ref, thumb }
}
