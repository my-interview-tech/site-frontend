import type { ResultStatus } from '../model'

/** Пустые ответы по идентификаторам вопросов. */
export const emptyValues = (ids: readonly string[]): Record<string, string> =>
  Object.fromEntries(ids.map((id) => [id, '']))

/** Верный, неверный или пустой ответ. */
export const statusOf = (value: string | undefined, correct: string | undefined): ResultStatus => {
  if (!value) {
    return 'empty'
  }

  if (value === correct) {
    return 'correct'
  }

  return 'wrong'
}
