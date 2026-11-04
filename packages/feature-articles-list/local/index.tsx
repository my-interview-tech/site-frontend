import { createRoot } from 'react-dom/client'

import { TechnologyView } from '@my-interview/feature-articles-list'
import { Breadcrumb, ObsidianThemeProvider } from '@my-interview/ui-kit'

const Preview = () => (
  <ObsidianThemeProvider>
    <TechnologyView
      nav={(page) => <Breadcrumb items={[{ href: '#', label: 'Главная' }, { label: page.title }]} />}
      slug="react"
      onBack={() => window.history.back()}
    />
  </ObsidianThemeProvider>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
