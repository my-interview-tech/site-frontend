import { useSession } from '@my-interview/auth'
import { Button, Flex, IconButton, Image, Link, theme, useThemeMode } from '@my-interview/ui-kit'

import { featureToggles } from '@shared/config'
import { asset, loginUrl } from '@shared/constants'

import { LOCALES, TEXT } from '../../config'
import { useLocale } from '../../hooks'
import { Styled } from './styled'
import type { ActionsProps } from './types'

/**
 * Кнопки полосы: язык, вход, тема и меню.
 * @description Язык виден при сессии. Вход и меню зависят от флагов.
 */
export const Actions = ({ isMenuOpen, onToggleMenu, scheme }: ActionsProps) => {
  const { session } = useSession()
  const { chooseLocale, clusterRef, locale, panel, togglePanel } = useLocale()
  const { mode, toggle } = useThemeMode()
  const onHero = scheme === 'on-hero'
  const variant = onHero ? 'ghost' : 'glass'
  const isDark = mode === 'dark'
  const language = LOCALES.find((item) => item.id === locale) ?? LOCALES[0]

  return (
    <Flex alignItems="center" flexShrink={0} gap={theme.spacings.s8}>
      {session && (
        <Flex alignItems="center" gap={theme.spacings.s8} ref={clusterRef}>
          <Flex relatively>
            <Button
              aria-expanded={panel === 'lang'}
              aria-label={TEXT.LANGUAGE}
              shape="round"
              size={40}
              type="button"
              variant={variant}
              onClick={() => togglePanel('lang')}
            >
              <Image alt="" height={14} radius={theme.radii.r2} src={asset(language.flag)} width={20} />
            </Button>

            {panel === 'lang' ? (
              <Styled.Popover>
                {LOCALES.map((item) => (
                  <Button
                    fullWidth
                    key={item.id}
                    isSelected={locale === item.id}
                    type="button"
                    variant="text"
                    onClick={() => chooseLocale(item.id)}
                  >
                    <Flex alignItems="center" gap={theme.spacings.s8}>
                      <Image alt="" height={14} radius={theme.radii.r2} src={asset(item.flag)} width={20} />
                      {item.label}
                    </Flex>
                  </Button>
                ))}
              </Styled.Popover>
            ) : null}
          </Flex>
        </Flex>
      )}

      {featureToggles.auth && (
        <Button as={Link} href={loginUrl} variant={variant}>
          {TEXT.LOGIN}
        </Button>
      )}

      <IconButton
        iconSrc={isDark ? 'icon-sun' : 'icon-moon'}
        label={isDark ? TEXT.TO_LIGHT : TEXT.TO_DARK}
        variant={variant}
        onClick={toggle}
      />

      {featureToggles.menu && (
        <IconButton
          iconSrc={isMenuOpen ? 'close' : 'menu'}
          isOpen={isMenuOpen}
          label={isMenuOpen ? TEXT.MENU_CLOSE : TEXT.MENU_OPEN}
          variant={variant}
          onClick={onToggleMenu}
        />
      )}
    </Flex>
  )
}
