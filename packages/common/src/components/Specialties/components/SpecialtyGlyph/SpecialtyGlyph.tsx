import { specialtyIcon } from './SpecialtyGlyph.constants'
import { Styled } from './SpecialtyGlyph.styled'

export type SpecialtyGlyphProps = {
  title: string
}

/**
 * Иконка специальности в меню.
 * На широком экране скрыта.
 */
export const SpecialtyGlyph = ({ title }: SpecialtyGlyphProps) => (
  <Styled.Icon iconSrc={specialtyIcon[title] ?? specialtyIcon.Frontend} size={22} />
)
