import { ThemeModeProvider } from '../../theme/ThemeMode'
import { Fonts } from '../../theme/styles/fonts'
import { GlobalStyles } from '../../theme/styles/GlobalStyles'
import { Normalize } from '../../theme/styles/normalize'
import { BreakpointProvider } from '../BreakpointProvider'

import type { UiKitProviderProps } from './UiKitProvider.types'

/**
 * Корневой провайдер ui-kit: режим темы, брейкпоинт для `useBreakpoint`, шрифты, сброс и глобальные стили.
 * Подключается один раз в корне приложения или dev-входа пакета.
 */
export const UiKitProvider = ({ children }: UiKitProviderProps) => (
  <ThemeModeProvider>
    <BreakpointProvider>
      <Fonts />
      <Normalize />
      <GlobalStyles />

      {children}
    </BreakpointProvider>
  </ThemeModeProvider>
)
