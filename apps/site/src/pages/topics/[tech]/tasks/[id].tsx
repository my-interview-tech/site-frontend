import { useMemo } from 'react'
import { useNavigate } from 'react-router'

import { TaskView } from '@my-interview/feature-task'
import { Breadcrumb } from '@my-interview/ui-kit'
import { useParams } from '@router'

import { crumbs, home, tasksHrefOf } from '@shared/lib'
import { PageFrame } from '@shared/ui/page-frame'

/**
 * Решение задачи выбранной технологии.
 * @access public
 */
const TaskPage = () => {
  const { id, tech } = useParams('/topics/:tech/tasks/:id')
  const navigate = useNavigate()
  const tasksHref = useMemo(() => tasksHrefOf(), [])

  return (
    <PageFrame>
      <TaskView
        key={`${tech}:${id}`}
        id={id}
        nav={(task) => (
          <Breadcrumb items={crumbs([home(), { href: tasksHref, label: 'Задачи' }, { label: task.title }])} />
        )}
        tasksHref={tasksHref}
        tech={tech}
        onBack={() => navigate(tasksHref)}
      />
    </PageFrame>
  )
}

export default TaskPage
