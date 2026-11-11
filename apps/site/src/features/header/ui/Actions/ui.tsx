import { Flex, IconButton, theme, useThemeMode } from '@my-interview/ui-kit'

import { featureToggles } from '@shared/config'

import { TEXT } from '../../config'
import type { ActionsProps } from './types'

/**
 * Кнопки полосы: язык, вход, тема и меню.
 * @description Язык виден при сессии. Вход и меню зависят от флагов.
 */
export const Actions = ({ isMenuOpen, onToggleMenu, scheme }: ActionsProps) => {
  const { mode, toggle } = useThemeMode()

  const onHero = scheme === 'on-hero'
  const variant = onHero ? 'ghost' : 'glass'
  const isDark = mode === 'dark'

  return (
    <Flex alignItems="center" flexShrink={0} gap={theme.spacings.s8}>
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
