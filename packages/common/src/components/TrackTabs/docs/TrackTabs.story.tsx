import { useState } from 'react'
import type { Meta, StoryObj } from '@storybook/react-vite'

import { TrackTabs } from '../TrackTabs'
import type { TrackTabsItem } from '../TrackTabs.types'

const ITEMS: TrackTabsItem[] = [
  { id: 'frontend', title: 'Frontend' },
  { id: 'backend', title: 'Backend' },
]

const meta = {
  title: 'common/components/TrackTabs',
  component: TrackTabs,
  args: {
    activeId: 'frontend',
    activeKey: 'frontend',
    items: ITEMS,
    onSelect: () => undefined,
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TrackTabs>

export default meta

type Story = StoryObj<typeof meta>

const Demo = ({ items }: { items: readonly TrackTabsItem[] }) => {
  const [activeId, setActiveId] = useState('frontend')

  return <TrackTabs activeId={activeId} activeKey={activeId} items={items} onSelect={setActiveId} />
}

export const Default: Story = {
  render: (args) => <Demo items={args.items} />,
}
