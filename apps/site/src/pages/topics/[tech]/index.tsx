import { useNavigate } from 'react-router'

import { TechnologyView } from '@my-interview/feature-articles-list'
import { Breadcrumb } from '@my-interview/ui-kit'
import { useParams } from '@router'

import { crumbs, home, sectionHref } from '@shared/lib'
import { PageFrame } from '@shared/ui/page-frame'

const homeHref = sectionHref('/topics', 'specialties')

/**
 * Страница карточки технологии: вопросы, статьи и задачи.
 * @access public
 */
const TopicPage = () => {
  const { tech } = useParams('/topics/:tech')
  const navigate = useNavigate()

  return (
    <PageFrame>
      <TechnologyView
        key={tech}
        nav={(screen) => <Breadcrumb items={crumbs([home(), { label: screen.title }])} />}
        slug={tech}
        onBack={() => navigate(homeHref)}
      />
    </PageFrame>
  )
}

export default TopicPage
