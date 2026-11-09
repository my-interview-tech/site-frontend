import { useLocation } from 'react-router'

import { useSession } from '@my-interview/auth'
import { Flex, Image, theme } from '@my-interview/ui-kit'

import { asset } from '@shared/constants'
import { useGuestChrome } from '@shared/model/guest-chrome'

import { TEXT } from '../config'
import { useLogoutParam, useSiteHeader } from '../hooks'
import { getLogoHref, isAuthPath } from '../lib'
import { Actions } from './Actions'
import { Menu } from './Menu'
import { Styled } from './styled'

/**
 * Шапка гостевого сайта: логотип, язык, тема и меню разделов.
 */
export const Header = () => {
  const { pathname } = useLocation()
  const { logout } = useSession()
  const { navOffset, navScheme, navSurface } = useGuestChrome()
  const { closeMenu, isMenuOpen, toggleMenu } = useSiteHeader()
  const auth = isAuthPath(pathname)
  const scheme = auth || isMenuOpen ? 'on-surface' : navScheme
  const contrast = (pathname !== '/' && !isMenuOpen) || auth
  const logoHref = getLogoHref(pathname, auth)

  useLogoutParam(logout)

  return (
    <>
      <Styled.ScrollLock />
      <Styled.Scrim $open={isMenuOpen} onClick={closeMenu} />
      <Styled.Container $offset={isMenuOpen ? 0 : navOffset}>
        <Styled.Bar
          fillWidth
          relatively
          $contrast={contrast}
          $solid={scheme === 'on-surface' && !isMenuOpen}
          $surface={navSurface}
          alignItems="center"
          desktopS={{ p: `0 ${theme.container.padding}px` }}
          justifyContent="space-between"
          p={`0 ${theme.container.paddingMobile}px`}
          tablet={{ p: `0 ${theme.container.paddingTablet}px` }}
        >
          <Styled.Logo href={logoHref}>
            <Flex inline alignItems="center" as="span" gap={theme.spacings.s8}>
              <Image alt="" height={24} src={asset('icons/logo-mark.png')} width={24} />
              <Styled.Word
                color={scheme === 'on-hero' ? theme.colors.textOnHero : theme.colors.textPrimary}
                font={500}
                weight="semibold"
              >
                {TEXT.LOGO}
              </Styled.Word>
            </Flex>
          </Styled.Logo>

          {!auth && <Actions isMenuOpen={isMenuOpen} scheme={scheme} onToggleMenu={toggleMenu} />}
        </Styled.Bar>
        <Menu isOpen={isMenuOpen} onClose={closeMenu} />
      </Styled.Container>
    </>
  )
}
