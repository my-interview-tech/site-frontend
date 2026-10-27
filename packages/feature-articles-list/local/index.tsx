import { createRoot } from 'react-dom/client'

import { TechnologyView } from '@my-interview/feature-articles-list'
import { Fonts, GlobalStyles, Normalize, ThemeModeProvider } from '@my-interview/ui-kit'

const Preview = () => (
  <ThemeModeProvider>
    <Fonts />
    <Normalize />
    <GlobalStyles />
    <TechnologyView
      crumbs={(page) => [{ href: '#', label: 'Главная' }, { label: page.title }]}
      slug="react"
      onBack={() => window.history.back()}
    />
  </ThemeModeProvider>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
