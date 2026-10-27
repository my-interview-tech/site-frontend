import { useCallback, useState } from 'react'
import { useTheme } from 'styled-components'

import { AdSlot, Aside, Columns, Toc, useActiveAnchor } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { RecommendationDrawer } from '@articles-list/features/recommendation-drawer'
import { TechnologyHeader } from '@articles-list/features/technology-header'
import { TechnologyResources } from '@articles-list/features/technology-resources'
import { TechnologySections } from '@articles-list/features/technology-sections'
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
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const { activeId, setActiveId } = useActiveAnchor(toc.map((item) => item.id))
  const { item, label } = recommendations

  const selectToc = ({ id }: (typeof toc)[number]) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <TechnologyHeader {...accordion} isRecommendationsOpen={open} onClick={() => setOpen(true)} />
      <RecommendationDrawer {...item} isOpen={open} label={label} onClose={handleClose} />

      <Columns gap={theme.spacings.s40} sidebar={280}>
        <Flex flexDirection="column" gap={theme.spacings.s32} style={{ minWidth: 0 }}>
          <TechnologySections sections={sections} />
          <TechnologyResources resources={resources} />
        </Flex>

        <Aside alignSelf="start">
          <Toc activeId={activeId} items={toc} label={tocLabel} onSelect={selectToc} />
          <RecommendationCard {...item} label={label} />
          {ad && <AdSlot {...ad} />}
        </Aside>
      </Columns>
    </Flex>
  )
}
