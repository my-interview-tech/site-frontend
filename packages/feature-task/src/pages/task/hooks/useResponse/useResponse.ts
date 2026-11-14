import { EPageStatus, getPageStatus, useFetch } from '@my-interview/common'

import { loadTask } from '@task/shared/api'

import { REQUIRED_KEYS } from '../../config'
import type { PageResponse, Props } from './types'

export const useResponse = ({ id, tech }: Props): PageResponse => {
  // TODO: mock fetch
  const { data, error, isLoading, reload } = useFetch(`${tech}:${id}`, () => loadTask({ id, tech }))

  const pageStatus = getPageStatus(isLoading, error !== null, data ?? null, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      task: null,
      pageStatus,
      reload,
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      task: null,
      pageStatus: EPageStatus.ERROR,
      reload,
    }
  }

  return {
    task: data,
    pageStatus,
    reload,
  }
}
