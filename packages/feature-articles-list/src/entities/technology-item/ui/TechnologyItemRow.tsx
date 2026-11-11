import { Badge, Icon, Link, Text, theme } from '@my-interview/ui-kit'

import { KIND_BADGE_COLOR, KIND_LABEL, TEXT, TechnologyItemStatus } from '../constants'
import { itemStatus } from '../lib'
import type { TechnologyItemRowProps } from '../types'
import { Styled } from './styled'

/**
 * Строка материала: номер, заголовок, тип, закладка и отметка.
 *
 * @description
 * - Без `href` заголовок остаётся текстом.
 * - Закрытый материал отмечен замком, изученный — галочкой.
 */
export const TechnologyItemRow = ({ href, item }: TechnologyItemRowProps) => {
  const status = itemStatus(item)
  const isLocked = status === TechnologyItemStatus.LOCKED

  return (
    <Styled.Row id={item.id}>
      <Text
        as="span"
        color={isLocked ? theme.colors.textPrimary : theme.colors.textTertiary}
        font={400}
        textAlign="right"
      >
        {item.index}
      </Text>

      {href ? (
        <Styled.TitleLink as={Link} href={href}>
          {item.title}
        </Styled.TitleLink>
      ) : (
        <Styled.Title>{item.title}</Styled.Title>
      )}

      <Badge color={KIND_BADGE_COLOR[item.kind]}>{KIND_LABEL[item.kind]}</Badge>

      <Styled.Bookmark
        counter={item.bookmarkCount}
        iconSrc="icon-bookmark"
        label={TEXT.BOOKMARK}
        size={32}
        variant="text"
      />

      <Styled.Status aria-label={TEXT.STATUS} type="button">
        <Styled.StatusMark inline $status={status} alignItems="center" justifyContent="center">
          {status === TechnologyItemStatus.STUDIED && <Icon isMonochrome iconSrc="icon-check" size={14} />}
          {isLocked && <Icon isMonochrome iconSrc="icon-lock" />}
        </Styled.StatusMark>
      </Styled.Status>
    </Styled.Row>
  )
}
