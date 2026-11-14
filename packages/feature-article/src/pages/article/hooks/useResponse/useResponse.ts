import { EPageStatus, getPageStatus, useFetch } from '@my-interview/common'

import { loadArticle } from '@shared/api'

import { REQUIRED_KEYS } from '../../config'
import type { PageResponse, Props } from './types'

export const useResponse = ({ id, tech }: Props): PageResponse => {
  // TODO: mock fetch
  const { data, error, isLoading, reload } = useFetch(`${tech}:${id}`, () => loadArticle({ id, tech }))

  const pageStatus = getPageStatus(isLoading, error !== null, data, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      article: null,
      pageStatus,
      reload,
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      article: null,
      pageStatus: EPageStatus.ERROR,
      reload,
    }
  }

  return {
    article: data,
    pageStatus,
    reload,
  }
}
