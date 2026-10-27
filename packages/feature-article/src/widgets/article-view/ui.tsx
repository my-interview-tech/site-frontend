import { useCallback, useState } from 'react'
import { useTheme } from 'styled-components'

import { ArticleAd, ArticleBody, ArticleHeader, ArticleOffer, ArticleSkills, ArticleToc } from '@features'
import { Aside, Columns, EArticleAccess, useActiveAnchor } from '@my-interview/common'
import { Flex } from '@my-interview/ui-kit'

import { ArticleMeta } from '@entities/article-meta'

import type { ArticleContentProps } from './types'

/**
 * Содержимое загруженной статьи.
 *
 * @description
 * - Открытая статья показывает текст и навык.
 * - Закрытая статья показывает открытую часть и оффер вместо продолжения.
 */
export const ArticleContent = ({
  accordion,
  ad,
  badge,
  content,
  meta,
  toc,
  tocLabel,
  ...article
}: ArticleContentProps) => {
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const { activeId, setActiveId } = useActiveAnchor(toc.map((item) => item.id))

  const offer = article.access === EArticleAccess.SUBSCRIPTION ? article.offer : null

  const scrollTo = (id: string) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <ArticleHeader {...accordion} badge={badge} isSkillsOpen={open} onClick={() => setOpen(true)} />
      <ArticleSkills {...meta} isSkillsOpen={open} onClose={handleClose} />

      <Columns align="start" gap={theme.spacings.s20} sidebar={240}>
        <ArticleBody {...content} paywall={offer ? <ArticleOffer {...offer} /> : undefined} />
        <Aside>
          <ArticleToc activeId={activeId} items={toc} label={tocLabel} onSelect={scrollTo} />
          <ArticleMeta {...meta} />
          {ad && <ArticleAd {...ad} />}
        </Aside>
      </Columns>
    </Flex>
  )
}
