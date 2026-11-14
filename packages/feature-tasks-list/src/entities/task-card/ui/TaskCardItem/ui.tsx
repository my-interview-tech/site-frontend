import { useState } from 'react'

import { Chip, Flex, Icon, Image, Indicator, Modal, Text, theme } from '@my-interview/ui-kit'

import { LANGUAGE_ICON, TEXT } from '../../constants'
import { formatAddedAt } from '../../lib'
import type { TaskCardItemProps } from '../../types'
import { Styled } from '../styled'

/**
 * Карточка задачи в каталоге.
 *
 * @description
 * - Слева язык, под названием мета и темы, справа сложность.
 * - Закрытая задача открывает заглушку оффера. Закладка остаётся кнопкой.
 */
export const TaskCardItem = ({ favorite = false, item, onFavorite }: TaskCardItemProps) => {
  const { addedAt, companies, difficulty, href, isAvailable, languages, tags, title } = item
  const [isOfferOpen, setIsOfferOpen] = useState(false)

  return (
    <Styled.Card
      $available={isAvailable}
      alignItems="center"
      forwardedAs="article"
      gap={theme.spacings.s16}
      p={`${theme.spacings.s16}px ${theme.spacings.s20}px`}
    >
      {languages.length > 0 && (
        <Flex alignItems="center" alignSelf="center" flexDirection="column" flexShrink={0} gap={theme.spacings.s8}>
          {languages.map((language) => (
            <Icon iconSrc={LANGUAGE_ICON[language] ?? LANGUAGE_ICON.javascript} key={language} size={40} />
          ))}
        </Flex>
      )}

      <Styled.Shrink flex={1} flexDirection="column" gap={theme.spacings.s8}>
        <Styled.Shrink alignItems="center" gap={theme.spacings.s8}>
          {isAvailable ? (
            <Styled.TitleLink href={href}>{title}</Styled.TitleLink>
          ) : (
            <Styled.Title forwardedAs="span" color={theme.colors.textTertiary} font={500} weight="semibold">
              {title}
            </Styled.Title>
          )}
          {onFavorite && (
            <Styled.Bookmark
              $isActive={favorite}
              aria-pressed={favorite}
              iconSrc={favorite ? 'icon-star-filled' : 'icon-star'}
              label={favorite ? TEXT.SAVED : TEXT.SAVE}
              size={32}
              title={favorite ? TEXT.SAVED : TEXT.SAVE}
              variant="text"
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                event.preventDefault()
                event.stopPropagation()
                onFavorite(item.id)
              }}
            />
          )}
        </Styled.Shrink>

        <Flex alignItems="center" flexWrap="wrap" gap={theme.spacings.s12}>
          <Flex inline alignItems="center" gap={theme.spacings.s4} title={TEXT.ADDED}>
            <Icon isMonochrome color={theme.colors.textTertiary} iconSrc="icon-clock" />
            <Text as="span" color={theme.colors.textTertiary} font={200}>
              {formatAddedAt(addedAt)}
            </Text>
          </Flex>
          {companies.map((itemCompany) => (
            <Image
              alt={itemCompany.name}
              height={20}
              key={itemCompany.id}
              src={itemCompany.icon}
              title={itemCompany.name}
              width={20}
            />
          ))}
        </Flex>

        {tags.length > 0 && (
          <Flex flexWrap="wrap" gap={theme.spacings.s6}>
            {tags.map((tag) => (
              <Chip key={tag} variant="rect">
                {tag}
              </Chip>
            ))}
          </Flex>
        )}
      </Styled.Shrink>

      <Indicator value={difficulty} />

      {!isAvailable && (
        <Styled.OpenOffer variant="text" onClick={() => setIsOfferOpen(true)}>
          {TEXT.OFFER}
        </Styled.OpenOffer>
      )}

      <Modal isOpen={isOfferOpen} title={TEXT.OFFER} onClose={() => setIsOfferOpen(false)}>
        <Text as="p" color={theme.colors.textTertiary} font={400}>
          {TEXT.OFFER_STUB}
        </Text>
      </Modal>
    </Styled.Card>
  )
}
