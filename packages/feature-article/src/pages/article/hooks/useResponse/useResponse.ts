import { EPageStatus, useFetch } from '@my-interview/common'

import { loadArticle } from '@shared/api'
import { REQUIRED_KEYS, getPageStatus } from '../../lib'
import type { PageResponse, Props } from './types'

export const useResponse = ({ crumbs, id, tech }: Props): PageResponse => {
  // TODO: mock fetch
  const { data, error, isLoading, reload } = useFetch(`${tech}:${id}`, () => loadArticle({ id, tech }))

  const pageStatus = getPageStatus(isLoading, error !== null, data, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      article: null,
      pageStatus,
      reload,
      crumbs: [],
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      article: null,
      pageStatus: EPageStatus.ERROR,
      reload,
      crumbs: [],
    }
  }

  return {
    article: data,
    pageStatus,
    reload,
    crumbs: crumbs(data),
  }
}
