import { useLocation } from 'react-router'
import { useTheme } from 'styled-components'

import { Text } from '@my-interview/ui-kit'

import { featureToggles } from '@shared/config'
import { sectionHref } from '@shared/lib'

import { MENU } from '../../config'
import { isAuthPath } from '../../lib'
import { Styled } from './styled'
import type { MenuLinkProps, MenuProps } from './types'

const MenuLink = ({ font, link, onNavigate, pathname }: MenuLinkProps) => {
  const theme = useTheme()
  const href = link.sectionId ? sectionHref(pathname, link.sectionId) : link.href

  if (!href) {
    return (
      <Text as="span" color={theme.colors.textPrimary} font={font}>
        {link.label}
      </Text>
    )
  }

  return (
    <Text as="a" color={theme.colors.textPrimary} font={font} href={href} onClick={onNavigate}>
      {link.label}
    </Text>
  )
}

/**
 * Шторка разделов гостевого сайта.
 * @description Прячется на страницах входа и при выключенном меню.
 */
export const Menu = ({ isOpen, onClose }: MenuProps) => {
  const theme = useTheme()
  const { pathname } = useLocation()

  if (isAuthPath(pathname) || !featureToggles.menu) {
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
                <Styled.Column $end key={item.title}>
                  <Text as="p" color={theme.colors.textPrimary} font="navHeading">
                    {item.title}
                  </Text>
                  {item.links.map((link) => (
                    <MenuLink key={link.label} font="navLink" link={link} pathname={pathname} onNavigate={onClose} />
                  ))}
                </Styled.Column>
              ) : (
                <MenuLink key={item.label} font="navHeading" link={item} pathname={pathname} onNavigate={onClose} />
              )
            )}
          </Styled.Columns>
        </Styled.RevealClip>
      </Styled.Reveal>
    </Styled.Sheet>
  )
}
