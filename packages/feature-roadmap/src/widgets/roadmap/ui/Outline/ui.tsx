import { Toc, useActiveAnchor, type TocItem } from '@my-interview/common'

import { TEXT } from '../../constants'

export type OutlineProps = {
  /** Пункты оглавления. Пустой список, пока якорей нет в DOM. */
  items: TocItem[]
}

/**
 * Оглавление трека. Подсвечивает видимый шаг, клик скроллит к нему.
 * Своё состояние держит внутри: скролл не перерисовывает граф.
 */
export const Outline = ({ items }: OutlineProps) => {
  const { activeId, setActiveId } = useActiveAnchor(items.map((item) => item.id))

  const jump = (item: TocItem) => {
    setActiveId(item.id)
    document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return <Toc activeId={activeId} items={items} label={TEXT.TOC} onSelect={jump} />
}
