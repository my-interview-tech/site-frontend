import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router'

import { ArticleView } from '@my-interview/feature-article'
import { Fonts, GlobalStyles, Normalize, ThemeModeProvider } from '@my-interview/ui-kit'

const ArticlePreview = () => {
  const { id, tech } = useParams()
  const navigate = useNavigate()

  if (!id || !tech) {
    return null
  }

  return (
    <ArticleView
      crumbs={(article) => [
        { href: '/topics', label: 'Главная' },
        { href: `/topics/${tech}`, label: article.meta.tech ?? tech },
        { label: article.title },
      ]}
      id={id}
      tech={tech}
      onBack={() => navigate('/topics')}
    />
  )
}

const Preview = () => (
  <BrowserRouter>
    <ThemeModeProvider>
      <Fonts />
      <Normalize />
      <GlobalStyles />
      <Routes>
        <Route element={<ArticlePreview />} path="/topics/:tech/articles/:id" />
        <Route element={<Navigate replace to="/topics/html/articles/doctype" />} path="*" />
      </Routes>
    </ThemeModeProvider>
  </BrowserRouter>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
