import { fetchApi, isApiMock } from '@my-interview/common'

import type { Article, ArticleOffer, ArticleRequest } from '../model'

import { loadArticle as loadMockArticle } from './mock'

type ArticleBase = Omit<Extract<Article, { access: 'subscription' }>, 'access' | 'offer'>

type ArticleScreenDto = ArticleBase & {
  access: 'open' | 'subscription'
  offer?: ArticleOffer
}

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
