import { useCallback, useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'

import { TasksView } from '@my-interview/feature-tasks-list'
import type { TaskSelection } from '@my-interview/feature-tasks-list'
import { Breadcrumb } from '@my-interview/ui-kit'

import { crumbs, home, parseSelection, rememberTasksQuery, sectionHref, serializeSelection } from '@shared/lib'
import { PageFrame } from '@shared/ui/page-frame'

const homeHref = sectionHref('/topics', 'specialties')

/**
 * Страница каталога задач.
 * @access public
 */
const TasksPage = () => {
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.toString()

  const selection = useMemo(() => parseSelection(new URLSearchParams(query)), [query])

  const handleSelectionChange = useCallback(
    (next: TaskSelection) => {
      setSearchParams(serializeSelection(next), { preventScrollReset: true, replace: true })
    },
    [setSearchParams]
  )

  useEffect(() => {
    rememberTasksQuery(query)
  }, [query])

  return (
    <PageFrame>
      <TasksView
        nav={() => <Breadcrumb items={crumbs([home(), { label: 'Задачи' }])} />}
        selection={selection}
        onBack={() => navigate(homeHref)}
        onSelectionChange={handleSelectionChange}
      />
    </PageFrame>
  )
}

export default TasksPage
