import { useCallback, useState } from 'react'
import { useTheme } from 'styled-components'

import { ArticleAd, ArticleBody, ArticleHeader, ArticleOffer, ArticleSkills, ArticleToc } from '@features'
import { Aside, EArticleAccess, useActiveAnchor } from '@my-interview/common'
import { Badge, Breadcrumb, Flex, Text } from '@my-interview/ui-kit'

import { ArticleMeta } from '@entities/article-meta'
import { Columns, LockIcon } from '@shared/ui'

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
  crumbs,
  meta,
  title,
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

  const closeDrawer = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <Flex flexDirection="column" gap={theme.spacings.s12} style={{ minWidth: 0 }}>
        <Flex alignItems="center" gap={theme.spacings.s12} justifyContent="space-between">
          <Breadcrumb items={crumbs} />
          {badge && <Badge icon={<LockIcon />}>{badge}</Badge>}
        </Flex>
        <Text as="h1" color={theme.colors.textPrimary} font="h2">
          {title}
        </Text>
        <ArticleHeader {...accordion} isSkillsOpen={open} onClick={() => setOpen(true)} />
      </Flex>
      <ArticleSkills {...meta} isSkillsOpen={open} onClose={closeDrawer} />
      <Columns>
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
