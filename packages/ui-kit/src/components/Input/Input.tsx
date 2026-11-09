import { Styled } from './Input.styled'
import type { InputProps } from './Input.types'

/**
 * Однострочное поле ввода.
 */
export const Input = ({ label, onChange, type = 'text', value, ...rest }: InputProps) => (
  <Styled.Field
    {...rest}
    aria-label={label}
    type={type}
    value={value}
    onChange={(event) => onChange(event.target.value)}
  />
)
