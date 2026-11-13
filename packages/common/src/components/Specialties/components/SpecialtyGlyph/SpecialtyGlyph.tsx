import { theme } from '@my-interview/ui-kit'

import { specialtyIcon } from './SpecialtyGlyph.constants'
import { Styled } from './SpecialtyGlyph.styled'

export type SpecialtyGlyphProps = {
  isLocked?: boolean
  title: string
}

/**
 * Иконка специальности в меню.
 * На широком экране скрыта.
 */
export const SpecialtyGlyph = ({ isLocked = false, title }: SpecialtyGlyphProps) => (
  <Styled.Icon
    isMonochrome
    color={isLocked ? theme.colors.disabled : theme.colors.textPrimary}
    iconSrc={specialtyIcon[title] ?? specialtyIcon.Frontend}
    size={22}
  />
)
