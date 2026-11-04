import { useTheme } from 'styled-components'

import { useSession } from '@my-interview/auth'
import { Button, Flex, MenuButton, Text, ThemeToggle } from '@my-interview/ui-kit'

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
  const theme = useTheme()
  const { session } = useSession()
  const { chooseLocale, clusterRef, locale, panel, togglePanel } = useLocale()
  const onHero = scheme === 'on-hero'
  const language = LOCALES.find((item) => item.id === locale) ?? LOCALES[0]

  return (
    <Flex alignItems="center" flexShrink={0} gap={theme.spacings.s8}>
      {session ? (
        <Flex alignItems="center" gap={theme.spacings.s8} ref={clusterRef}>
          <Flex relatively>
            <Styled.IconButton
              $onHero={onHero}
              aria-expanded={panel === 'lang'}
              aria-label={TEXT.LANGUAGE}
              type="button"
              onClick={() => togglePanel('lang')}
            >
              <Styled.Flag aria-hidden alt="" height={14} src={asset(language.flag)} width={20} />
            </Styled.IconButton>

            {panel === 'lang' ? (
              <Styled.Popover>
                {LOCALES.map((item) => (
                  <Styled.LocaleOption
                    fillWidth
                    key={item.id}
                    $current={locale === item.id}
                    alignItems="center"
                    forwardedAs="button"
                    gap={theme.spacings.s8}
                    p={`${theme.spacings.s8}px ${theme.spacings.s12}px`}
                    type="button"
                    onClick={() => chooseLocale(item.id)}
                  >
                    <Styled.Flag aria-hidden alt="" height={14} src={asset(item.flag)} width={20} />
                    <Text color={theme.colors.textPrimary} font="navLink">
                      {item.label}
                    </Text>
                  </Styled.LocaleOption>
                ))}
              </Styled.Popover>
            ) : null}
          </Flex>
        </Flex>
      ) : null}
      {featureToggles.auth ? (
        <Button lens href={loginUrl} size="md" variant={scheme === 'on-hero' ? 'on-hero-ghost' : 'default'}>
          {TEXT.LOGIN}
        </Button>
      ) : null}
      <Button Component={<ThemeToggle scheme={scheme} />} />
      {featureToggles.menu ? (
        <Button
          Component={
            <MenuButton
              iconSrc={isMenuOpen ? asset('close.svg') : asset('menu.svg')}
              isOpen={isMenuOpen}
              label={isMenuOpen ? TEXT.MENU_CLOSE : TEXT.MENU_OPEN}
              scheme={scheme}
              onClick={onToggleMenu}
            />
          }
        />
      ) : null}
    </Flex>
  )
}
