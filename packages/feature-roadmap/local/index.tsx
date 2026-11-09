import { createRoot } from 'react-dom/client'
import { BrowserRouter, Link as RouterLink, Navigate, Route, Routes, useParams } from 'react-router'

import { Roadmap } from '@my-interview/feature-roadmap'
import { LinkProvider, Text, UiKitProvider, type LinkProps } from '@my-interview/ui-kit'

const TopicStub = () => {
  const { tech } = useParams()

  return <Text as="h1">{tech}</Text>
}

const PreviewLink = ({ href, ...props }: LinkProps) => <RouterLink to={href} {...props} />

const Preview = () => (
  <BrowserRouter>
    <UiKitProvider>
      <LinkProvider component={PreviewLink}>
        <Routes>
          <Route element={<Roadmap topicHref={(slug) => `/topics/${slug}`} />} path="/topics" />
          <Route element={<TopicStub />} path="/topics/:tech" />
          <Route element={<Navigate replace to="/topics?track=frontend" />} path="*" />
        </Routes>
      </LinkProvider>
    </UiKitProvider>
  </BrowserRouter>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
