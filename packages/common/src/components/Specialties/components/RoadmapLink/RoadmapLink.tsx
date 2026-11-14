import { Icon, Link, theme } from '@my-interview/ui-kit'

import { specialtiesCopy } from '../../Specialties.config'

import { Styled } from './RoadmapLink.styled'

export type RoadmapLinkProps = {
  href: string
  title: string
}

/**
 * Ссылка на дорожную карту выбранной специальности.
 */
export const RoadmapLink = ({ href, title }: RoadmapLinkProps) => (
  <Styled.Link
    inline
    alignItems="center"
    aria-label={`${specialtiesCopy.roadmap}: ${title}`}
    forwardedAs={Link}
    gap={theme.spacings.s8}
    href={href}
    p={`${theme.spacings.s4 + theme.spacings.s6}px ${theme.spacings.s4 + theme.spacings.s14}px`}
  >
    <Icon isMonochrome iconSrc="icon-roadmap" size={16} />
    {specialtiesCopy.roadmap}
  </Styled.Link>
)
