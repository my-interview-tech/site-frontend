import { Outlet } from 'react-router'
import { ThemeProvider } from 'styled-components'

import { AuthGuard, SITE_URL } from '@my-interview/auth'
import { burgundyLightTheme } from '@my-interview/ui-kit'

import { Link } from '../router'

const AppLayout = () => (
  <ThemeProvider theme={burgundyLightTheme}>
    <AuthGuard>
      <header>
        <nav>
          <Link to="/">Dashboard</Link>
          <a href={SITE_URL}>Site</a>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </AuthGuard>
  </ThemeProvider>
)

export default AppLayout
