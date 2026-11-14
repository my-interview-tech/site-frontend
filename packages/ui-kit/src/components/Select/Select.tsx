import { useCallback, useId, useState } from 'react'

import { theme } from '../../theme/theme'
import { Flex } from '../Flex'
import { Icon } from '../Icon'
import { Text } from '../Text'

import { getNextValue, getSummary } from './Select.lib'
import { Styled } from './Select.styled'
import type { SelectProps } from './Select.types'
import { useSelect } from './useSelect'

/**
 * Выпадающий список с подписью.
 *
 * @description
 * - Одиночный выбор закрывает список, повторный клик по выбранному пункту снимает выбор.
 * - Множественный выбор держит список открытым, в поле — первый пункт и счётчик остальных.
 * - Список закрывается по клику вне поля и по Escape.
 */
export const Select = ({ isMultiple = false, label, onChange, options, placeholder, value }: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const labelId = useId()
  const listId = useId()
  const handleClose = useCallback(() => setIsOpen(false), [])
  const rootRef = useSelect(isOpen, handleClose)

  const choose = (id: string) => {
    onChange(getNextValue(value, id, isMultiple))

    if (!isMultiple) {
      setIsOpen(false)
    }
  }

  return (
    <Flex flexDirection="column" gap={theme.spacings.s8}>
      <Text color={theme.colors.textSecondary} font={400} id={labelId} weight="semibold">
        {label}
      </Text>
      <Styled.Field ref={rootRef}>
        <Styled.Trigger
          aria-controls={listId}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          aria-labelledby={labelId}
          onClick={() => setIsOpen((current) => !current)}
        >
          <Styled.Summary>{getSummary(options, value, placeholder)}</Styled.Summary>
          <Icon isMonochrome direction={isOpen ? 'up' : 'down'} iconSrc="icon-chevron" size={16} />
        </Styled.Trigger>

        {isOpen && (
          <Styled.Menu
            aria-labelledby={labelId}
            aria-multiselectable={isMultiple}
            flexDirection="column"
            id={listId}
            role="listbox"
          >
            {options.map((option) => {
              const isSelected = value.includes(option.id)

              return (
                <Styled.Option
                  key={option.id}
                  aria-selected={isSelected}
                  role="option"
                  onClick={() => choose(option.id)}
                >
                  {option.slotBefore}
                  <Styled.OptionLabel>{option.label}</Styled.OptionLabel>
                  {option.hint && <Styled.Hint>{option.hint}</Styled.Hint>}
                  {isSelected && <Icon isMonochrome iconSrc="icon-check" size={14} />}
                </Styled.Option>
              )
            })}
          </Styled.Menu>
        )}
      </Styled.Field>
    </Flex>
  )
}
