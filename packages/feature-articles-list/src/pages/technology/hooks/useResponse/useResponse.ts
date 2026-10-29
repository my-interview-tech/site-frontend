import { EPageStatus, getPageStatus, useFetch } from '@my-interview/common'

import { loadScreen } from '@articles-list/shared/api'

import { REQUIRED_KEYS } from '../../lib'
import type { PageResponse, Props } from './types'

export const useResponse = ({ crumbs, slug }: Props): PageResponse => {
  // TODO: mock fetch
  const { data, error, isLoading, reload } = useFetch(slug, () => loadScreen({ slug }))

  const pageStatus = getPageStatus(isLoading, error !== null, data ?? null, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      screen: null,
      pageStatus,
      reload,
      crumbs: [],
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      screen: null,
      pageStatus: EPageStatus.ERROR,
      reload,
      crumbs: [],
    }
  }

  return {
    screen: data,
    pageStatus,
    reload,
    crumbs: crumbs(data),
  }
}
