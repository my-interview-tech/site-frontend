import { HeaderDetails } from '@my-interview/common'
import { Accordion, Badge, Cell, IconButton, Image } from '@my-interview/ui-kit'

import { LockIcon, NavIcon } from '@shared/ui'

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
  const BadgeComponent = badge && (
    <Badge icon={<LockIcon />} variant={badge.variant}>
      {badge.label}
    </Badge>
  )
  const ActionComponent = (
    <Styled.Action>
      <IconButton isOpen={isSkillsOpen} onClick={onClick}>
        <NavIcon />
      </IconButton>
    </Styled.Action>
  )

  if (!isAvailable) {
    return (
      <Cell action={ActionComponent} badge={BadgeComponent} caption={caption} mark={ImageComponent} title={title} />
    )
  }

  return (
    <Accordion action={ActionComponent} badge={BadgeComponent} caption={caption} mark={ImageComponent} title={title}>
      <HeaderDetails interview={interview} result={result} />
    </Accordion>
  )
}
