import { Outlet } from 'react-router'

import { UiKitProvider } from '@my-interview/ui-kit'

const App = () => (
  <UiKitProvider>
    <Outlet />
  </UiKitProvider>
)

export default App
