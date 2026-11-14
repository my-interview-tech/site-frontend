import type { KeyboardEvent } from 'react'

import { theme } from '../../theme/theme'

import { getNextIndex } from './Tabs.lib'
import { Styled } from './Tabs.styled'
import type { TabsProps } from './Tabs.types'

/**
 * Вкладки с подчёркиванием выбранной.
 *
 * @description
 * - В порядок Tab попадает только выбранная вкладка. Стрелки, Home и End переключают и переводят фокус.
 * - Панель с содержимым рисует вызывающий: компонент отвечает только за переключатель.
 */
export const Tabs = <T extends string>({ items, label, onChange, value }: TabsProps<T>) => {
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>, index: number) => {
    const next = getNextIndex(event.key, index, items.length)
    const item = next === null ? undefined : items[next]

    if (next === null || !item) {
      return
    }

    event.preventDefault()
    onChange(item.id)
    event.currentTarget.parentElement?.querySelectorAll<HTMLElement>('[role="tab"]')[next]?.focus()
  }

  return (
    <Styled.Root inline aria-label={label} gap={theme.spacings.s20} role="tablist">
      {items.map((item, index) => {
        const isSelected = item.id === value

        return (
          <Styled.Tab
            key={item.id}
            $isSelected={isSelected}
            aria-selected={isSelected}
            role="tab"
            tabIndex={isSelected ? 0 : -1}
            onClick={() => onChange(item.id)}
            onKeyDown={(event: KeyboardEvent<HTMLElement>) => handleKeyDown(event, index)}
          >
            {item.label}
          </Styled.Tab>
        )
      })}
    </Styled.Root>
  )
}
