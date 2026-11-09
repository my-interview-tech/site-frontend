import { createGlobalStyle } from 'styled-components'

import { getThemeVars, theme } from '../theme'

export const GlobalStyles = createGlobalStyle`
  :root {
    ${({ theme: { mode } }) => getThemeVars(mode)}
  }

  html {
    color-scheme: ${({ theme: { mode } }) => mode};
  }

  body {
    background: ${theme.colors.page};
    color: ${theme.colors.textPrimary};
  }
`
