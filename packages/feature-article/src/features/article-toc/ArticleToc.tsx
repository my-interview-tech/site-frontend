import { useTheme } from 'styled-components'

import { Text } from '@my-interview/ui-kit'

import { Styled } from './styled'
import type { ArticleTocProps } from './types'

/**
 * Навигация по статье.
 */
export const ArticleToc = ({ activeId, items, label, onSelect }: ArticleTocProps) => {
  const theme = useTheme()

  return (
    <div>
      <Styled.Label>
        <Text as="p" color={theme.colors.textTertiary} font="eyebrow">
          {label}
        </Text>
      </Styled.Label>

      {items.map(({ id, label: itemLabel }) => (
        <Styled.TocButton key={id} $active={id === activeId} type="button" onClick={() => onSelect(id)}>
          {itemLabel}
        </Styled.TocButton>
      ))}
    </div>
  )
}
