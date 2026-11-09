import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { Toc } from '../Toc'
import type { TocItem } from '../Toc.types'

const ITEMS: TocItem[] = [
  { id: 'jsx', label: 'JSX', type: 'group' },
  { id: 'intro', label: 'Введение в React', level: 2, type: 'link' },
  { id: 'lists', label: 'Списки', level: 2, type: 'link' },
  { id: 'extra', label: 'Вне группы', type: 'link' },
]

const meta = {
  title: 'common/components/Toc',
  component: Toc,
  args: {
    activeId: 'intro',
    items: ITEMS,
    label: 'На этой странице',
    onSelect: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Toc>

export default meta

type Story = StoryObj<typeof meta>

const Demo = ({ items, label }: { items: TocItem[]; label: string }) => {
  const [activeId, setActiveId] = useState('intro')

  return <Toc activeId={activeId} items={items} label={label} onSelect={(item) => setActiveId(item.id)} />
}

export const Default: Story = {
  render: (args) => <Demo items={args.items} label={args.label} />,
}
