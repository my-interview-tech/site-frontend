import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useNavigate, useParams } from 'react-router'

import { QuizView } from '@my-interview/feature-quiz'
import { Breadcrumb, UiKitProvider } from '@my-interview/ui-kit'

const QuizPreview = () => {
  const { id, tech } = useParams()
  const navigate = useNavigate()

  if (!id || !tech) {
    return null
  }

  return (
    <QuizView
      id={id}
      nav={(quiz) => (
        <Breadcrumb
          items={[
            { href: '/topics', label: 'Главная' },
            { href: `/topics/${tech}`, label: quiz.topicTitle },
            { label: quiz.title },
          ]}
        />
      )}
      tech={tech}
      onBack={() => navigate(`/topics/${tech}`)}
    />
  )
}

const Preview = () => (
  <BrowserRouter>
    <UiKitProvider>
      <Routes>
        <Route element={<QuizPreview />} path="/topics/:tech/quizzes/:id" />
        <Route element={<Navigate replace to="/topics/react/quizzes/4" />} path="*" />
      </Routes>
    </UiKitProvider>
  </BrowserRouter>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
