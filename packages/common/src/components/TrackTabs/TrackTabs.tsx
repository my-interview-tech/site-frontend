import { theme } from '@my-interview/ui-kit'

import { Styled } from './TrackTabs.styled'
import type { TrackTabsProps } from './TrackTabs.types'
import { useThumb } from './useThumb'

/**
 * Вкладки-сегменты. Бегунок повторяет выбранную кнопку.
 */
export const TrackTabs = ({ activeId, activeKey, items, onSelect }: TrackTabsProps) => {
  const { ref, thumb } = useThumb(activeKey)

  return (
    <Styled.Island inline ref={ref} gap={theme.spacings.s4} p={theme.spacings.s4} role="tablist">
      {thumb.width > 0 && <Styled.Thumb $height={thumb.height} $width={thumb.width} $x={thumb.x} $y={thumb.y} />}
      {items.map((item) => (
        <Styled.Segment
          key={item.id}
          $active={item.id === activeId}
          aria-selected={item.id === activeId}
          role="tab"
          type="button"
          variant="text"
          onClick={() => onSelect(item.id)}
        >
          {item.title}
        </Styled.Segment>
      ))}
    </Styled.Island>
  )
}
