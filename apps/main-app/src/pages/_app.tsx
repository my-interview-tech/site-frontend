import { Outlet } from 'react-router'

import { AuthGuard, SITE_URL } from '@my-interview/auth'
import { Layout } from '@my-interview/ui-kit'

import { Link } from '../router'

const App = () => (
  <Layout
    nav={
      <>
        <Link to="/">Dashboard</Link>
        <a href={SITE_URL}>Site</a>
      </>
    }
    wrapper={AuthGuard}
  >
    <Outlet />
  </Layout>
)

export default App
