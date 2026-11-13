import { Badge, theme } from '@my-interview/ui-kit'

import { specialtiesCopy } from '../../Specialties.config'
import type { Specialty } from '../../Specialties.types'
import { SpecialtyGlyph } from '../SpecialtyGlyph'

import { Styled } from './SpecialtyTabs.styled'

export type SpecialtyTabsProps = {
  activeTitle: string
  items: readonly Specialty[]
  onSelect: (title: string) => void
}

/**
 * Меню специальностей.
 */
export const SpecialtyTabs = ({ activeTitle, items, onSelect }: SpecialtyTabsProps) => (
  <Styled.Menu flexDirection="column" flexShrink={0} gap={theme.spacings.s4} p={0} tablet={{ p: theme.spacings.s12 }}>
    {items.map((item) => {
      const isActive = !item.isLocked && item.title === activeTitle

      return (
        <Styled.Item
          fullWidth
          key={item.title}
          $isActive={isActive}
          aria-label={item.isLocked ? `${item.title}, ${specialtiesCopy.soon}` : item.title}
          disabled={item.isLocked}
          type="button"
          variant="text"
          onClick={() => onSelect(item.title)}
        >
          <SpecialtyGlyph isLocked={item.isLocked} title={item.title} />

          <Styled.Title
            color={isActive ? theme.colors.accent : theme.colors.textPrimary}
            font={400}
            weight={isActive ? 'semibold' : 'regular'}
          >
            {item.title}
          </Styled.Title>

          {item.isLocked ? (
            <Styled.Count>
              <Badge color="redOutline">{specialtiesCopy.soon}</Badge>
            </Styled.Count>
          ) : (
            <Styled.Count color={isActive ? theme.colors.accentDeep : theme.colors.textTertiary} font={200}>
              {item.count}
            </Styled.Count>
          )}
        </Styled.Item>
      )
    })}
  </Styled.Menu>
)
