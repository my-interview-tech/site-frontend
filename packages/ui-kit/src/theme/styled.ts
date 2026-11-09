import type { Theme, ThemeMode } from './theme'

export type AppTheme = Theme & {
  mode: ThemeMode
}

declare module 'styled-components' {
  export interface DefaultTheme extends AppTheme {}
}

export {}
