import type { TaskDifficulty } from '@tasks-list/shared/model'

import { DIFFICULTY_HINT } from '../../constants'

const isDifficulty = (level: number): level is TaskDifficulty => Number.isInteger(level) && level >= 1 && level <= 10

/**
 * Подсказка у крайних уровней списка: самый лёгкий и самый сложный.
 */
export const getDifficultyHint = (level: number, levels: readonly number[]): string | undefined => {
  if (level === Math.min(...levels)) {
    return DIFFICULTY_HINT.EASIEST
  }

  if (level === Math.max(...levels)) {
    return DIFFICULTY_HINT.HARDEST
  }

  return undefined
}

/**
 * Ключи пунктов списка обратно в уровни сложности. Чужие значения отбрасываются.
 */
export const parseDifficulties = (ids: readonly string[]): TaskDifficulty[] =>
  ids.map(Number).filter((level): level is TaskDifficulty => isDifficulty(level))
