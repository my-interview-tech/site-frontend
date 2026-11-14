import { createRoot } from 'react-dom/client'

import { TasksView } from '@my-interview/feature-tasks-list'
import { Breadcrumb, UiKitProvider } from '@my-interview/ui-kit'

const Preview = () => (
  <UiKitProvider>
    <TasksView
      nav={() => <Breadcrumb items={[{ href: '#', label: 'Главная' }, { label: 'Задачи' }]} />}
      onBack={() => window.history.back()}
    />
  </UiKitProvider>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
