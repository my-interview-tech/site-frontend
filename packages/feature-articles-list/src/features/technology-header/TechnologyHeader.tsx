import { useTheme } from 'styled-components'

import { Accordion, Badge, Cell, Flex, IconButton, Image, NavIcon, Text } from '@my-interview/ui-kit'

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
      <Flex flexDirection="column" gap={theme.spacings.s8}>
        <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
          {interview.label}
        </Text>
        <Text as="p" color={theme.colors.textPrimary} font="leadStrong">
          {interview.title}
        </Text>
        {interview.body && (
          <Text as="p" color={theme.colors.textSecondary} font="body">
            {interview.body}
          </Text>
        )}
      </Flex>

      {result && (
        <Flex flexDirection="column" gap={theme.spacings.s8}>
          <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
            {result.label}
          </Text>
          <Flex as="ol" flexDirection="column" gap={theme.spacings.s8}>
            {result.items.map((item) => (
              <Text key={item} as="li" color={theme.colors.textSecondary} font="body">
                {item}
              </Text>
            ))}
          </Flex>
        </Flex>
      )}
    </Accordion>
  )
}
