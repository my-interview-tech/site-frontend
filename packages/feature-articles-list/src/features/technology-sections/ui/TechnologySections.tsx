import { Fragment } from 'react'

import { Title, theme } from '@my-interview/ui-kit'
import { TechnologyItemRow } from '@articles-list/entities/technology-item'

import { UpgradeBanner } from '@articles-list/entities/upgrade-banner'

import type { TechnologySection } from '@articles-list/shared/model'

import { groupSections } from '../lib/groupSections'
import type { TechnologySectionsProps } from '../types'
import { Styled } from './styled'

type SectionBlockProps = {
  heading: 'h2' | 'h3'
  section: TechnologySection
}

const SectionBlock = ({ heading, section }: SectionBlockProps) => {
  const { anchor, items, title, upgrade } = section

  return (
    <Styled.Section flexDirection="column" forwardedAs="section" gap={theme.spacings.s12} id={anchor}>
      <Title size={heading === 'h2' ? 700 : 500} title={title} titleAs={heading} />

      <Styled.Panel flexDirection="column" radius={10}>
        {items.map((item) => (
          <Fragment key={item.id}>
            <TechnologyItemRow href={item.isAvailable ? item.href : undefined} item={item} />
            {upgrade?.afterItemId === item.id && <UpgradeBanner {...upgrade} />}
          </Fragment>
        ))}
      </Styled.Panel>
    </Styled.Section>
  )
}

/**
 * Секции материалов технологии.
 *
 * @description
 * - Секции одной группы идут под общим заголовком.
 * - Закрытый материал идёт без ссылки.
 * - Баннер подписки встаёт после материала `upgrade.afterItemId`.
 */
export const TechnologySections = ({ sections }: TechnologySectionsProps) => (
  <>
    {groupSections(sections).map((block) =>
      block.type === 'group' ? (
        <Styled.Group
          flexDirection="column"
          forwardedAs="section"
          gap={theme.spacings.s32}
          id={block.group.anchor}
          key={block.group.anchor}
        >
          <Title size={700} title={block.group.title} titleAs="h2" />
          {block.sections.map((section) => (
            <SectionBlock heading="h3" key={section.id} section={section} />
          ))}
        </Styled.Group>
      ) : (
        <SectionBlock heading="h2" key={block.section.id} section={block.section} />
      )
    )}
  </>
)
