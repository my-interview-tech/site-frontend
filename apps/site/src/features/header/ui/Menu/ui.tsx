import { useLocation } from 'react-router'

import { Link, Text, theme } from '@my-interview/ui-kit'

import { featureToggles } from '@shared/config'
import { sectionHref } from '@shared/lib'

import { MENU } from '../../config'
import { Styled } from './styled'
import type { MenuLinkProps, MenuProps } from './types'

const MenuLink = ({ link, onNavigate, pathname, weight }: MenuLinkProps) => {
  const href = link.sectionId ? sectionHref(pathname, link.sectionId) : link.href

  if (!href) {
    return (
      <Text as="span" color={theme.colors.textPrimary} font={500} weight={weight}>
        {link.label}
      </Text>
    )
  }

  return (
    <Text as={Link} color={theme.colors.textPrimary} font={500} href={href} weight={weight} onClick={onNavigate}>
      {link.label}
    </Text>
  )
}

/**
 * Шторка разделов гостевого сайта.
 * @description Прячется на страницах входа и при выключенном меню.
 */
export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const { pathname } = useLocation()

  if (!featureToggles.menu) {
    return null
  }

  return (
    <Styled.Sheet $open={isOpen}>
      <Styled.Reveal $open={isOpen}>
        <Styled.RevealClip $open={isOpen} inert={!isOpen}>
          <Styled.Divider />
          <Styled.Columns>
            {MENU.map((item) =>
              'links' in item ? (
                <Styled.Column $end flexDirection="column" gap={theme.spacings.s12} key={item.title}>
                  <Text as="p" color={theme.colors.textPrimary} font={500} weight="semibold">
                    {item.title}
                  </Text>
                  {item.links.map((link) => (
                    <MenuLink key={link.label} link={link} pathname={pathname} onNavigate={onClose} />
                  ))}
                </Styled.Column>
              ) : (
                <MenuLink key={item.label} link={item} pathname={pathname} weight="semibold" onNavigate={onClose} />
              )
            )}
          </Styled.Columns>
        </Styled.RevealClip>
      </Styled.Reveal>
    </Styled.Sheet>
  )
}
