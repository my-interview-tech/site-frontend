import { useCallback, useState } from 'react'

import { ArticleBody, ArticleHeader, ArticleOffer, ArticleSkills } from '@features'
import { Aside, ESubscriptionAccess, Toc, useActiveAnchor } from '@my-interview/common'
import { Flex, theme } from '@my-interview/ui-kit'

import { ArticleMeta } from '@entities/article-meta'

import type { ArticleContentProps } from './types'
import { Styled } from './styled'

/**
 * Содержимое загруженной статьи.
 *
 * @description
 * - Открытая статья показывает текст и навык.
 * - Закрытая статья показывает открытую часть и оффер вместо продолжения.
 */
export const ArticleContent = ({ accordion, badge, content, meta, toc, tocLabel, ...article }: ArticleContentProps) => {
  const [open, setOpen] = useState(false)
  const { activeId, setActiveId } = useActiveAnchor(toc.map((item) => item.id))

  const offer = article.access === ESubscriptionAccess.SUBSCRIPTION ? article.offer : null

  const scrollTo = (id: string) => {
    setActiveId(id)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <Flex flexDirection="column" gap={theme.spacings.s32}>
      <Flex flexDirection="column" gap={theme.spacings.s32}>
        <ArticleHeader {...accordion} badge={badge} isSkillsOpen={open} onClick={() => setOpen(true)} />
        <ArticleSkills {...meta} isSkillsOpen={open} onClose={handleClose} />
      </Flex>

      <Styled.Layout>
        <ArticleBody {...content} paywall={offer ? <ArticleOffer {...offer} /> : undefined} />
        <Styled.Side>
          <Aside>
            {toc.length > 0 && (
              <Toc activeId={activeId} items={toc} label={tocLabel} onSelect={({ id }) => scrollTo(id)} />
            )}
            <ArticleMeta {...meta} />
          </Aside>
        </Styled.Side>
      </Styled.Layout>
    </Flex>
  )
}
