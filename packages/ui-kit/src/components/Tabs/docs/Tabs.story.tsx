import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Tabs } from '../Tabs'
import type { TabsItem } from '../Tabs.types'

const ITEMS: TabsItem[] = [
  { id: 'description', label: 'Описание' },
  { id: 'review', label: 'Собеседование' },
  { id: 'skills', label: 'Навыки' },
]

const meta = {
  title: 'ui-kit/components/Tabs',
  component: Tabs,
  args: {
    items: ITEMS,
    label: 'Разделы задачи',
    value: 'description',
    onChange: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta

type Story = StoryObj<typeof meta>

const Controlled = ({ items }: { items: TabsItem[] }) => {
  const [value, setValue] = useState(items[0]?.id ?? '')

  return <Tabs items={items} label="Разделы задачи" value={value} onChange={setValue} />
}

export const Default: Story = {
  render: () => <Controlled items={ITEMS} />,
}
