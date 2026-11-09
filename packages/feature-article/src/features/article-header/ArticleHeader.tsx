import { HeaderDetails } from '@my-interview/common'
import { Accordion, Cell, IconButton, Image } from '@my-interview/ui-kit'
import type { BadgeProps } from '@my-interview/ui-kit'

import { BADGE_COLOR, TEXT } from './constants'
import { Styled } from './styled'
import type { ArticleHeaderProps } from './types'

/**
 * Шапка статьи.
 *
 * @description
 * - Доступный блок раскрывается аккордеоном с описанием вопроса и ожиданий.
 * - Недоступный блок остаётся ячейкой Cell того же размера.
 */
export const ArticleHeader = ({
  badge,
  isSkillsOpen,
  onClick,
  imageSrc,
  title,
  caption,
  isAvailable,
  interview,
  result,
}: ArticleHeaderProps) => {
  const ImageComponent = <Image alt="" height={48} src={imageSrc} width={48} />
  const badgeProps: BadgeProps | undefined = badge && {
    children: badge.label,
    color: BADGE_COLOR[badge.variant],
    iconSrc: 'icon-lock',
  }
  const ActionComponent = (
    <Styled.Action>
      <IconButton iconSrc="icon-nav" isOpen={isSkillsOpen} label={TEXT.SKILLS} onClick={onClick} />
    </Styled.Action>
  )

  if (!isAvailable) {
    return (
      <Styled.Section flexDirection="column" forwardedAs="section">
        <Cell
          badge={badgeProps}
          slotAfter={ActionComponent}
          slotBefore={ImageComponent}
          subtitle={caption}
          title={title}
        />
      </Styled.Section>
    )
  }

  return (
    <Styled.Section flexDirection="column" forwardedAs="section">
      <Accordion
        badge={badgeProps}
        slotAfter={ActionComponent}
        slotBefore={ImageComponent}
        subtitle={caption}
        title={title}
      >
        <HeaderDetails
          interview={{ body: interview.body, caption: interview.label, title: interview.title }}
          result={result && { caption: result.label, items: result.items }}
        />
      </Accordion>
    </Styled.Section>
  )
}
