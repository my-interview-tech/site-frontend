import { useNavigate } from 'react-router'

import { QuizView } from '@my-interview/feature-quiz'
import { Breadcrumb } from '@my-interview/ui-kit'
import { useParams } from '@router'

import { crumbs, home, topic } from '@shared/lib'
import { PageFrame } from '@shared/ui/page-frame'

/**
 * Квиз выбранной технологии.
 * @access public
 */
const TopicQuizPage = () => {
  const { id, tech } = useParams('/topics/:tech/quizzes/:id')
  const navigate = useNavigate()

  return (
    <PageFrame>
      <QuizView
        key={`${tech}:${id}`}
        id={id}
        nav={(quiz) => <Breadcrumb items={crumbs([home(), topic(tech, quiz.topicTitle), { label: quiz.title }])} />}
        tech={tech}
        onBack={() => navigate(`/topics/${tech}`)}
      />
    </PageFrame>
  )
}

export default TopicQuizPage
