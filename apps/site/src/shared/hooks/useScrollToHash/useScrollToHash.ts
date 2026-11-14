import { useLayoutEffect } from 'react'

import { sectionPinPx } from '@shared/constants'

/**
 * Прокрутка к секции из якоря адреса при монтировании.
 *
 * @description
 * Смещает окно так, чтобы элемент с id из `location.hash` встал на линии прилипания.
 * Без якоря или без такого узла прокрутку не меняет.
 */
export const useScrollToHash = (): void => {
  useLayoutEffect(() => {
    const id = window.location.hash.slice(1)
    const node = id ? document.getElementById(id) : null

    if (!node) {
      return
    }

    window.scrollTo(0, window.scrollY + node.getBoundingClientRect().top - sectionPinPx)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sectionPinPx])
}
