import { useNavigate } from 'react-router'

import { ArticleView } from '@my-interview/feature-article'
import { Breadcrumb } from '@my-interview/ui-kit'
import { useParams } from '@router'

import { crumbs, home } from '@shared/lib'
import { PageFrame } from '@shared/ui/page-frame'

/**
 * Вопрос выбранной технологии.
 * @access public
 */
const TopicArticlePage = () => {
  const { id, tech } = useParams('/topics/:tech/articles/:id')
  const navigate = useNavigate()

  return (
    <PageFrame>
      <ArticleView
        id={id}
        nav={(article) => (
          <Breadcrumb
            items={crumbs([
              home(),
              { href: `/topics/${tech}#${id}`, label: article.meta.tech ?? tech },
              { label: article.title },
            ])}
          />
        )}
        tech={tech}
        onBack={() => navigate(`/topics/${tech}#${id}`)}
      />
    </PageFrame>
  )
}

export default TopicArticlePage
