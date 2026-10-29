import { useTheme } from 'styled-components'

import { HeaderDetails } from '@my-interview/common'
import { Accordion, Badge, Cell, IconButton, Image, NavIcon } from '@my-interview/ui-kit'

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
  const theme = useTheme()

  const ImageComponent = <Image alt="" height={48} src={imageSrc} width={48} />
  const BadgeComponent = badges.length > 0 && (
    <Styled.Badges flexShrink={0} flexWrap="wrap" gap={theme.spacings.s4}>
      {badges.map(({ label, variant }) => (
        <Badge key={label} variant={variant}>
          {label}
        </Badge>
      ))}
    </Styled.Badges>
  )
  const ActionComponent = (
    <Styled.Action>
      <IconButton isOpen={isRecommendationsOpen} onClick={onClick}>
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
