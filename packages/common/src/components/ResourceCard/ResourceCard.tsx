import type { ResourceCardProps } from './ResourceCard.types'
import { Styled } from './ResourceCard.styled'

/**
 * Карточка внешнего материала: обложка во всю карточку, ссылка в новой вкладке.
 * `title` — подпись для скринридера.
 */
export const ResourceCard = ({ href, image, title }: ResourceCardProps) => (
  <Styled.Card $image={image} aria-label={title} href={href} rel="noopener noreferrer" target="_blank" />
)
