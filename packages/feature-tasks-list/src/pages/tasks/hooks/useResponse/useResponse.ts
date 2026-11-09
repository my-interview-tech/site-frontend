import { EPageStatus, getPageStatus, useFetch } from '@my-interview/common'

import { loadTasks } from '@tasks-list/shared/api'

import { REQUIRED_KEYS } from '../../config'
import type { PageResponse } from './types'

export const useResponse = (): PageResponse => {
  // TODO: mock fetch
  const { data, error, isLoading, reload } = useFetch('tasks', loadTasks)

  const pageStatus = getPageStatus(isLoading, error !== null, data ?? null, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      screen: null,
      pageStatus,
      reload,
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      screen: null,
      pageStatus: EPageStatus.ERROR,
      reload,
    }
  }

  return {
    screen: data,
    pageStatus,
    reload,
  }
}
