import { useEffect, useRef, useState } from 'react'

/** Шапка перекрывает верх. Нижние 55% вьюпорта не входят в зону чтения, иначе активен всегда нижний заголовок. */
const headerOffset = 80
const rootMargin = `-${headerOffset}px 0px -55% 0px`
const threshold = [0, 1]

const byTop = (left: HTMLElement, right: HTMLElement): number =>
  left.getBoundingClientRect().top - right.getBoundingClientRect().top

/**
 * Активный якорь среди видимых элементов.
 * Берётся самый верхний из тех, что попали в зону наблюдения.
 * Если зона пуста, берётся последний заголовок выше шапки: так низ страницы не залипает на раннем пункте.
 * Клик фиксирует пункт до конца плавной прокрутки, чтобы подсветка не прыгала по промежуточным секциям.
 */
export const useActiveAnchor = (
  ids: readonly string[]
): {
  activeId: string
  setActiveId: (id: string) => void
} => {
  const [activeId, setActiveId] = useState(ids[0] ?? '')
  const pinnedId = useRef<string | null>(null)
  const idsKey = ids.join('\0')

  const pinActiveId = (id: string) => {
    pinnedId.current = id
    setActiveId(id)
  }

  useEffect(() => {
    const currentIds = idsKey.length === 0 ? [] : idsKey.split('\0')
    const elements = currentIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null)

    const select = (id: string) => {
      setActiveId((current) => (current === id ? current : id))
    }

    if (elements.length === 0) {
      select('')

      return undefined
    }

    const visible = new Set<string>()

    const update = () => {
      if (pinnedId.current) {
        return
      }

      const ranked = elements.filter((element) => visible.has(element.id)).sort(byTop)

      if (ranked[0]) {
        select(ranked[0].id)

        return
      }

      const above = elements.filter((element) => element.getBoundingClientRect().top <= headerOffset).sort(byTop)

      select(above.at(-1)?.id ?? elements[0].id)
    }

    const release = () => {
      if (!pinnedId.current) {
        return
      }

      pinnedId.current = null
      update()
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visible.add(entry.target.id)

            return
          }

          visible.delete(entry.target.id)
        })

        update()
      },
      { rootMargin, threshold }
    )

    elements.forEach((element) => {
      observer.observe(element)
    })
    update()
    window.addEventListener('scrollend', release)

    return () => {
      observer.disconnect()
      window.removeEventListener('scrollend', release)
    }
  }, [idsKey])

  return { activeId, setActiveId: pinActiveId }
}
