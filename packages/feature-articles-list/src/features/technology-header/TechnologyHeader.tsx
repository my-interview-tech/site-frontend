import { HeaderDetails } from '@my-interview/common'
import { Accordion, Badge, Cell, IconButton, Image, theme } from '@my-interview/ui-kit'

import { BADGE_COLOR, TEXT } from './constants'
import { Styled } from './styled'
import type { TechnologyHeaderProps } from './types'

/**
 * Шапка технологии.
 *
 * @description
 * - Доступный блок раскрывается аккордеоном с описанием технологии и ожиданий.
 * - Недоступный блок остаётся ячейкой Cell того же размера.
 */
export const TechnologyHeader = ({
  badges,
  isRecommendationsOpen,
  onClick,
  imageSrc,
  title,
  caption,
  isAvailable,
  interview,
  result,
}: TechnologyHeaderProps) => {
  const ImageComponent = <Image alt="" height={48} src={imageSrc} width={48} />
  const BadgeComponent = badges.length > 0 && (
    <Styled.Badges flexShrink={0} flexWrap="wrap" gap={theme.spacings.s4}>
      {badges.map(({ label, variant }) => (
        <Badge key={label} color={BADGE_COLOR[variant]}>
          {label}
        </Badge>
      ))}
    </Styled.Badges>
  )
  const ActionComponent = onClick && (
    <Styled.Action>
      <IconButton iconSrc="icon-nav" isOpen={isRecommendationsOpen} label={TEXT.RECOMMENDATIONS} onClick={onClick} />
    </Styled.Action>
  )

  if (!isAvailable) {
    return (
      <Styled.Section flexDirection="column" forwardedAs="section">
        <Cell
          slotAfter={
            <>
              {BadgeComponent}
              {ActionComponent}
            </>
          }
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
        slotAfter={
          <>
            {BadgeComponent}
            {ActionComponent}
          </>
        }
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
