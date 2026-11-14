import { Styled } from './Code.styled'
import type { CodeProps } from './Code.types'

/**
 * Моноширинный текст.
 *
 * @description
 * - `inline` — фрагмент в строке, с фоном и радиусом.
 * - `block` — блок `pre` с горизонтальной прокруткой.
 */
export const Code = ({ children, variant = 'inline' }: CodeProps) => {
  if (variant === 'block') {
    return <Styled.Block>{children}</Styled.Block>
  }

  return <Styled.Inline>{children}</Styled.Inline>
}
