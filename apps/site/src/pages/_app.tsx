import { Outlet } from 'react-router'

import { MAIN_APP_URL } from '@my-interview/auth'
import { Layout } from '@my-interview/ui-kit'

import { Link } from '../router'

const App = () => (
  <Layout
    nav={
      <>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <a href={`${MAIN_APP_URL}/login`}>Sign in</a>
      </>
    }
  >
    <Outlet />
  </Layout>
)

export default App
