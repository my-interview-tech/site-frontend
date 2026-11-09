import { fetchApi, isApiMock } from '@my-interview/auth'
import type { ApiSchema } from '@my-interview/auth'

import type { Article, ArticleRequest } from '../model'

import { loadArticle as loadMockArticle } from './mock'

type ArticleScreenDto = ApiSchema<'ArticleScreenDto'>

/**
 * Сужает DTO до размеченного `Article`: `offer` есть только у закрытой статьи.
 */
const toArticle = ({ access, offer, ...article }: ArticleScreenDto): Article => {
  if (access === 'open') {
    return { ...article, access }
  }

  if (!offer) {
    throw new Error('Закрытая статья пришла без offer')
  }

  return { ...article, access, offer }
}

const articlePath = ({ id, tech }: ArticleRequest): string =>
  `/topics/${encodeURIComponent(tech)}/articles/${encodeURIComponent(id)}`

export const loadArticle = (request: ArticleRequest): Promise<Article> => {
  if (isApiMock()) {
    return loadMockArticle(request)
  }

  return fetchApi<ArticleScreenDto>(articlePath(request)).then(toArticle)
}
