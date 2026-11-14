import { createRoot } from 'react-dom/client'

import { TechnologyView } from '@my-interview/feature-articles-list'
import { Breadcrumb, UiKitProvider } from '@my-interview/ui-kit'

const Preview = () => (
  <UiKitProvider>
    <TechnologyView
      nav={(page) => <Breadcrumb items={[{ href: '#', label: 'Главная' }, { label: page.title }]} />}
      slug="react"
      onBack={() => window.history.back()}
    />
  </UiKitProvider>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
