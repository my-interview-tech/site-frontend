import { Badge, Flex, Link, STATIC_URL, Text, theme } from '@my-interview/ui-kit'

import { specialtiesCopy } from '../../Specialties.config'
import type { TechCard as TechCardData } from '../../Specialties.types'

import { Styled } from './TechCard.styled'

const iconSrc = (fileName: string) => `${STATIC_URL}/icons/${fileName}`

export type TechCardProps = {
  item: TechCardData
}

/**
 * Карточка технологии.
 */
export const TechCard = ({ item }: TechCardProps) => {
  const body = (
    <>
      {item.icon ? (
        <Styled.Icon alt="" height={40} src={iconSrc(item.icon)} width={40} />
      ) : (
        <Styled.Mark color={theme.colors.accent} font={400} weight="semibold">
          {item.title.slice(0, 1)}
        </Styled.Mark>
      )}

      <Styled.TextColumn flex={1} flexDirection="column" gap={2}>
        <Flex alignItems="center" gap={theme.spacings.s8}>
          <Styled.Name color={theme.colors.ink} font={500} forwardedAs="p" weight="semibold">
            {item.title}
          </Styled.Name>

          {item.isLocked && <Badge color="redOutline">{specialtiesCopy.soon}</Badge>}

          {item.badge === 'new' && <Badge color="purpleOutline">{specialtiesCopy.fresh}</Badge>}
        </Flex>

        <Text color={theme.colors.muted} font={200}>
          {item.count}
        </Text>
      </Styled.TextColumn>
      <Styled.Action inline alignItems="center" justifyContent="center">
        <Styled.Chevron alt="" height={16} src={iconSrc('chevron-right.svg')} width={16} />
      </Styled.Action>
    </>
  )

  if (item.isLocked) {
    return (
      <Styled.Locked disabled fullWidth type="button" variant="text">
        {body}
      </Styled.Locked>
    )
  }

  return (
    <Styled.Card fullWidth forwardedAs={Link} href={`/topics/${item.slug}`} variant="text">
      {body}
    </Styled.Card>
  )
}
