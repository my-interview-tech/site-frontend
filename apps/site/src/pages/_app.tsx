import { Outlet } from 'react-router'
import { ThemeProvider } from 'styled-components'

import { MAIN_APP_URL } from '@my-interview/auth'
import { burgundyLightTheme } from '@my-interview/ui-kit'

import { Link } from '../router'

const PublicLayout = () => (
  <ThemeProvider theme={burgundyLightTheme}>
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href={`${MAIN_APP_URL}/login`}>Sign in</a>
      </nav>
    </header>
    <main>
      <Outlet />
    </main>
  </ThemeProvider>
)

export default PublicLayout
