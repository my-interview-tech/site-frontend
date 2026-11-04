import { Badge, BookmarkIcon, CheckIcon, Link, LockIcon } from '@my-interview/ui-kit'

import { KIND_LABEL, TEXT, TechnologyItemStatus } from '../constants'
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

  return (
    <Styled.Row>
      <Styled.Index $locked={status === TechnologyItemStatus.LOCKED}>{item.index}</Styled.Index>

      {href ? (
        <Styled.TitleLink as={Link} href={href}>
          {item.title}
        </Styled.TitleLink>
      ) : (
        <Styled.Title>{item.title}</Styled.Title>
      )}

      <Badge variant={item.kind}>{KIND_LABEL[item.kind]}</Badge>

      <Styled.Bookmark aria-label={TEXT.BOOKMARK} type="button">
        <BookmarkIcon />
        {item.bookmarkCount && <Styled.BookmarkCount>{item.bookmarkCount}</Styled.BookmarkCount>}
      </Styled.Bookmark>

      <Styled.Status aria-label={TEXT.STATUS} type="button">
        <Styled.StatusMark inline $status={status} alignItems="center" justifyContent="center">
          {status === TechnologyItemStatus.STUDIED && <CheckIcon />}
          {status === TechnologyItemStatus.LOCKED && <LockIcon />}
        </Styled.StatusMark>
      </Styled.Status>
    </Styled.Row>
  )
}
