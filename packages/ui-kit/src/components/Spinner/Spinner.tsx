import { Styled } from './Spinner.styled'
import type { SpinnerProps } from './Spinner.types'

/**
 * Кольцо загрузки.
 */
export const Spinner = ({ label, size = 16 }: SpinnerProps) => (
  <Styled.Root
    $size={size}
    aria-hidden={label ? undefined : true}
    aria-label={label}
    role={label ? 'status' : undefined}
  />
)
