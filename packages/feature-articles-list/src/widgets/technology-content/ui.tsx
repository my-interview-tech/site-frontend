import { useCallback, useState } from 'react'

import { AdSlot, Aside, Columns, Toc, useActiveAnchor } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { RecommendationDrawer } from '@articles-list/features/recommendation-drawer'
import { TechnologyHeader } from '@articles-list/features/technology-header'
import { TechnologyResources } from '@articles-list/features/technology-resources'
import { buildTechnologyToc, TechnologySections } from '@articles-list/features/technology-sections'
import { RecommendationCard } from '@articles-list/entities/recommendation'

import type { TechnologyScreen } from '@articles-list/shared/model'

/**
 * Каталог статей технологии.
 */
export const TechnologyContent = ({
  accordion,
  ad,
  recommendations,
  resources,
  sections,
  toc,
  tocLabel,
}: TechnologyScreen) => {
  const [open, setOpen] = useState(false)
  const tocItems = buildTechnologyToc(sections, toc)
  const { activeId, setActiveId } = useActiveAnchor(
    tocItems.filter((item) => item.type !== 'group').map((item) => item.id)
  )

  const selectToc = ({ id }: (typeof tocItems)[number]) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <TechnologyHeader
        {...accordion}
        isRecommendationsOpen={open}
        onClick={recommendations ? () => setOpen(true) : undefined}
      />

      {recommendations && (
        <RecommendationDrawer
          {...recommendations.item}
          isOpen={open}
          label={recommendations.label}
          onClose={handleClose}
        />
      )}

      <Columns gap={theme.spacings.s40} sidebar={280}>
        <Flex flexDirection="column" gap={theme.spacings.s32} style={{ minWidth: 0 }}>
          <TechnologySections sections={sections} />
          <TechnologyResources resources={resources} />
        </Flex>

        <Aside alignSelf="start">
          <Toc activeId={activeId} items={tocItems} label={tocLabel} onSelect={selectToc} />
          {recommendations && <RecommendationCard {...recommendations.item} label={recommendations.label} />}
          {ad && <AdSlot caption={ad.size} label={ad.label} />}
        </Aside>
      </Columns>
    </Flex>
  )
}
