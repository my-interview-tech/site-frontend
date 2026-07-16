import type { ReactNode } from 'react'
import { ThemeProvider } from 'styled-components'

import { burgundyLightTheme } from '../theme/theme'

type AppShellProps = {
  nav: ReactNode
  children: ReactNode
  wrapper?: (props: { children: ReactNode }) => ReactNode
}

const Identity = ({ children }: { children: ReactNode }) => children

export const Layout = ({ nav, children, wrapper: Wrapper = Identity }: AppShellProps) => (
  <ThemeProvider theme={burgundyLightTheme}>
    <Wrapper>
      <header>
        <nav>{nav}</nav>
      </header>
      <main>{children}</main>
    </Wrapper>
  </ThemeProvider>
)
