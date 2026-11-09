import { emptyThumb } from './TrackTabs.constants'
import type { ThumbBox } from './TrackTabs.types'

/**
 * Прямоугольник выбранной вкладки внутри корня.
 */
export const thumbOf = (root: HTMLElement): ThumbBox => {
  const current = root.querySelector<HTMLElement>('[aria-selected="true"]')

  if (!current) {
    return emptyThumb
  }

  const rootBox = root.getBoundingClientRect()
  const box = current.getBoundingClientRect()

  return {
    height: box.height,
    width: box.width,
    x: box.left - rootBox.left,
    y: box.top - rootBox.top,
  }
}
