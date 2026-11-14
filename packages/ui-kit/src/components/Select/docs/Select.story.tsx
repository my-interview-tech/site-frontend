import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Flex } from '../../Flex'
import { Icon } from '../../Icon'
import { Indicator } from '../../Indicator'
import { Select } from '../Select'
import type { SelectOption } from '../Select.types'

const LANGUAGES: SelectOption[] = [
  { id: 'javascript', label: 'JavaScript', slotBefore: <Icon iconSrc="icon-javascript" size={16} /> },
  { id: 'typescript', label: 'TypeScript', slotBefore: <Icon iconSrc="icon-typescript" size={16} /> },
]

const LEVELS: SelectOption[] = [
  { id: '1', label: 'Лёгкая', hint: 'легче', slotBefore: <Indicator value={1} /> },
  { id: '5', label: 'Средняя', slotBefore: <Indicator value={5} /> },
  { id: '10', label: 'Сложная', hint: 'сложнее', slotBefore: <Indicator value={10} /> },
]

const TAGS: SelectOption[] = [
  { id: 'array', label: 'Массивы' },
  { id: 'string', label: 'Строки' },
  { id: 'closure', label: 'Замыкания' },
  { id: 'async', label: 'Асинхронность' },
]

const meta = {
  title: 'ui-kit/components/Select',
  component: Select,
  args: {
    label: 'Язык',
    options: LANGUAGES,
    placeholder: 'Все',
    value: [],
    onChange: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta

type Story = StoryObj<typeof meta>

const Controlled = ({
  isMultiple,
  label,
  options,
}: {
  isMultiple?: boolean
  label: string
  options: SelectOption[]
}) => {
  const [value, setValue] = useState<string[]>([])

  return (
    <Flex flexDirection="column" width={280}>
      <Select
        isMultiple={isMultiple}
        label={label}
        options={options}
        placeholder="Все"
        value={value}
        onChange={setValue}
      />
    </Flex>
  )
}

export const Default: Story = {
  render: () => <Controlled label="Язык" options={LANGUAGES} />,
}

export const WithHint: Story = {
  render: () => <Controlled label="Сложность" options={LEVELS} />,
}

export const Multiple: Story = {
  render: () => <Controlled isMultiple label="Темы" options={TAGS} />,
}
