import type { ResultStatus } from '@quiz/shared/model'

import { TEXT } from '../constants'

/** Подпись статуса ответа. */
export const markOf = (status: ResultStatus): string => {
  if (status === 'correct') {
    return TEXT.MARK_CORRECT
  }

  if (status === 'empty') {
    return TEXT.EMPTY_ANSWER
  }

  return TEXT.MARK_WRONG
}
