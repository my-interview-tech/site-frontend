import type { TechnologySection, TechnologyTocItem } from '@articles-list/shared/model'

import { groupSections } from '../groupSections'

/** Пункт оглавления экрана: заголовок группы или кликабельная секция. */
export type TechnologyTocEntry = TechnologyTocItem & {
  type: 'group' | 'link'
  level: 1 | 2
}

const RESOURCES_ID = 'resources'

const group = (id: string, label: string): TechnologyTocEntry => ({
  id,
  label,
  level: 1,
  type: 'group',
})

const link = (id: string, label: string, level: 1 | 2): TechnologyTocEntry => ({
  id,
  label,
  level,
  type: 'link',
})

/**
 * Оглавление страницы технологии.
 *
 * Заголовок группы не ведёт к якорю. Секции внутри группы — вложенные пункты.
 * Секция без группы остаётся пунктом верхнего уровня. «Полезные материалы» дописываются в конец.
 *
 * @param sections - Секции в порядке экрана
 * @param toc - Оглавление ответа. Из него берётся только пункт карусели
 * @returns Пункты для боковой колонки
 */
export const buildTechnologyToc = (
  sections: readonly TechnologySection[],
  toc: readonly TechnologyTocItem[]
): TechnologyTocEntry[] => {
  const items = groupSections(sections).flatMap((block): TechnologyTocEntry[] => {
    if (block.type === 'group') {
      return [
        group(block.group.anchor, block.group.title),
        ...block.sections.map((section) => link(section.anchor, section.title, 2)),
      ]
    }

    return [link(block.section.anchor, block.section.title, 1)]
  })

  const resources = toc.find((item) => item.id === RESOURCES_ID)

  return resources ? [...items, link(resources.id, resources.label, 1)] : items
}
