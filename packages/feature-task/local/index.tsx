import { createRoot } from 'react-dom/client'

import { TaskView } from '@my-interview/feature-task'
import { Breadcrumb, UiKitProvider } from '@my-interview/ui-kit'

const Preview = () => (
  <UiKitProvider>
    <TaskView
      id="101"
      nav={(task) => (
        <Breadcrumb
          items={[
            { href: '#', label: 'Главная' },
            { href: '#', label: 'React' },
            { href: '#', label: 'Задачи' },
            { label: task.title },
          ]}
        />
      )}
      tasksHref="#"
      tech="react"
      onBack={() => window.history.back()}
    />
  </UiKitProvider>
)

const root = document.getElementById('root')

if (root) {
  createRoot(root).render(<Preview />)
}
