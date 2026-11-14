import type { TechnologySection, TechnologySectionGroup } from '@articles-list/shared/model'

/** Секции одной группы или одна секция без группы. */
export type TechnologySectionBlock =
  | {
      group: TechnologySectionGroup
      sections: TechnologySection[]
      type: 'group'
    }
  | {
      section: TechnologySection
      type: 'section'
    }

const isSameGroup = (
  block: TechnologySectionBlock | undefined,
  section: TechnologySection
): block is Extract<TechnologySectionBlock, { type: 'group' }> =>
  Boolean(section.group && block?.type === 'group' && block.group.anchor === section.group.anchor)

/**
 * Склеивает подряд идущие секции с одним `group.anchor`.
 *
 * Секция без группы остаётся отдельным блоком. Баннер подписки сидит на секции и от склейки не зависит.
 *
 * @param sections - Секции в порядке экрана
 * @returns Блоки для рендера
 */
export const groupSections = (sections: readonly TechnologySection[]): TechnologySectionBlock[] =>
  sections.reduce<TechnologySectionBlock[]>((blocks, section) => {
    const previous = blocks.at(-1)

    if (isSameGroup(previous, section) && section.group) {
      return [...blocks.slice(0, -1), { ...previous, sections: [...previous.sections, section] }]
    }

    if (section.group) {
      return [...blocks, { group: section.group, sections: [section], type: 'group' }]
    }

    return [...blocks, { section, type: 'section' }]
  }, [])
