import { clampProgress } from './Progress.lib'
import { Styled } from './Progress.styled'
import type { ProgressProps } from './Progress.types'

/**
 * Полоса прогресса в процентах.
 */
export const Progress = ({ label, value }: ProgressProps) => {
  const percent = clampProgress(value)

  return (
    <Styled.Root aria-label={label} aria-valuemax={100} aria-valuemin={0} aria-valuenow={percent} role="progressbar">
      <Styled.Fill $value={percent} />
    </Styled.Root>
  )
}
