import { EPageStatus, getPageStatus, useFetch } from '@my-interview/common'

import { loadQuiz } from '@quiz/shared/api'

import { REQUIRED_KEYS } from '../../config'
import type { PageResponse, Props } from './types'

export const useResponse = ({ id, tech }: Props): PageResponse => {
  const { data, error, isLoading, reload } = useFetch(`${tech}:${id}`, () => loadQuiz({ id, tech }))

  const pageStatus = getPageStatus(isLoading, error !== null, data ?? null, REQUIRED_KEYS)

  if (pageStatus === EPageStatus.LOADING) {
    return {
      pageStatus,
      data: null,
      reload,
    }
  }

  if (pageStatus !== EPageStatus.SUCCESS || data === null) {
    return {
      pageStatus: EPageStatus.ERROR,
      data: null,
      reload,
    }
  }

  return {
    pageStatus,
    data,
    reload,
  }
}
